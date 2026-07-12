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

  const bookings = await db
    .collection("bookings")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const eventIds = bookings.map((b) => b.eventId);
  const events = await db
    .collection("events")
    .find({ _id: { $in: eventIds } })
    .toArray();

  const eventsById = new Map(events.map((e) => [e._id.toString(), e]));

  const enriched = bookings.map((b) => ({
    ...b,
    event: eventsById.get(b.eventId.toString()) ?? null,
  }));

  return NextResponse.json(enriched);
}