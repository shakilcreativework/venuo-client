import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  await db.collection("contactMessages").insertOne({
    name,
    email,
    message,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}