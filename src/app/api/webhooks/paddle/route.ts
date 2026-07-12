import { NextRequest, NextResponse } from "next/server";
import { paddle } from "@/lib/paddle";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function POST(request: NextRequest) {
  const signature = request.headers.get("paddle-signature");
  const rawBody = await request.text();

  let event;

  try {
    // NOTE: `unmarshal` is the current Paddle Node SDK method name for
    // verifying + parsing a webhook payload as of this writing. If your
    // installed version errors here, check the SDK's exported webhook
    // verification helper — the name/shape is the likeliest drift point.
    event = await paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET as string,
      signature as string,
    );
  } catch (err) {
    console.error("Paddle webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.eventType === "transaction.completed") {
    const bookingId = (event.data.customData as Record<string, string> | undefined)?.bookingId;

    if (bookingId && ObjectId.isValid(bookingId)) {
      await db
        .collection("bookings")
        .updateOne({ _id: new ObjectId(bookingId) }, { $set: { paymentStatus: "paid" } });
    }
  }

  return NextResponse.json({ received: true });
}