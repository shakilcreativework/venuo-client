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

  const events = await db.collection("events").find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json(events);
}