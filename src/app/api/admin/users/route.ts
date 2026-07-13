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

  // NOTE: better-auth's default MongoDB collection name for users is "user"
  // (singular). If this ever returns an empty array unexpectedly, check the
  // actual collection name in Atlas and adjust below.
  const users = await db
    .collection("user")
    .find({}, { projection: { name: 1, email: 1, role: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(users);
}