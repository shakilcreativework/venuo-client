import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  const [totalEvents, totalUsers, paidBookings] = await Promise.all([
    db.collection("events").countDocuments(),
    db.collection("user").countDocuments(),
    db.collection("bookings").find({ paymentStatus: "paid" }).toArray(),
  ]);

  const totalBookings = paidBookings.length;
  const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);

  return NextResponse.json({ totalEvents, totalUsers, totalBookings, totalRevenue });
}