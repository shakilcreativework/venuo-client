import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const events = await db.collection("events").find({ organizerId: session.user.id }).toArray();
  const eventIds = events.map((e) => e._id);

  const bookings = await db
    .collection("bookings")
    .find({ eventId: { $in: eventIds }, paymentStatus: "paid" })
    .toArray();

  const stats = events.map((event) => {
    const eventBookings = bookings.filter((b) => b.eventId.toString() === event._id.toString());
    const ticketsSold = eventBookings.reduce((sum, b) => sum + (b.quantity || 0), 0);
    const revenue = eventBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);

    return {
      eventId: event._id.toString(),
      title: event.title,
      ticketsSold,
      revenue,
    };
  });

  return NextResponse.json(stats);
}