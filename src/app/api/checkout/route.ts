import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { paddle } from "@/lib/paddle";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { eventId, quantity } = body as { eventId: string; quantity: number };

  if (!ObjectId.isValid(eventId)) {
    return NextResponse.json({ success: false, error: "Invalid event id." }, { status: 400 });
  }

  const event = await db.collection("events").findOne({ _id: new ObjectId(eventId) });

  if (!event) {
    return NextResponse.json({ success: false, error: "Event not found." }, { status: 404 });
  }

  const qty = Math.max(1, Number(quantity) || 1);
  const totalPaid = event.price * qty;

  // Free events skip Paddle entirely — booking is confirmed immediately.
  if (event.price === 0) {
    const result = await db.collection("bookings").insertOne({
      eventId: event._id,
      userId: session.user.id,
      quantity: qty,
      totalPaid: 0,
      currency: "USD",
      paymentProvider: "paddle",
      paymentStatus: "paid",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, free: true, bookingId: result.insertedId });
  }

  const booking = await db.collection("bookings").insertOne({
    eventId: event._id,
    userId: session.user.id,
    quantity: qty,
    totalPaid,
    currency: "USD",
    paymentProvider: "paddle",
    paymentStatus: "pending",
    createdAt: new Date(),
  });

  let transaction;
  try {
    // Creates a transaction with a non-catalog (custom) price, since event
    // prices are set dynamically by organizers rather than pre-configured
    // products/prices in the Paddle dashboard. This "inline price" shape is
    // the part most likely to need adjustment against Paddle's current
    // Transactions API reference.
    transaction = await paddle.transactions.create({
      items: [
        {
          quantity: qty,
          price: {
            description: event.title,
            name: event.title,
            product: {
              name: event.title,
              taxCategory: "standard",
            },
            unitPrice: {
              amount: Math.round(event.price * 100).toString(),
              currencyCode: "USD",
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
      customData: {
        bookingId: booking.insertedId.toString(),
        eventId: event._id.toString(),
        userId: session.user.id,
      },
    });
  } catch (err) {
    console.error("Paddle transaction creation failed — full error object:", err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paddleErr = err as any;
    return NextResponse.json(
      {
        success: false,
        error: paddleErr?.message ?? "Failed to create Paddle transaction.",
        detail: paddleErr?.detail ?? paddleErr?.errors ?? paddleErr?.body ?? null,
      },
      { status: 500 },
    );
  }

  await db
    .collection("bookings")
    .updateOne({ _id: booking.insertedId }, { $set: { paddleTransactionId: transaction.id } });

  return NextResponse.json({ success: true, transactionId: transaction.id });
}