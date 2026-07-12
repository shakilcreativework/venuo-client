import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    shortDescription,
    fullDescription,
    category,
    price,
    date,
    location,
    capacity,
    images,
  } = body;

  if (!title || !shortDescription || !fullDescription || !category || !date || !location) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  const newEvent = {
    organizerId: session.user.id,
    organizerName: session.user.name,
    title,
    shortDescription,
    fullDescription,
    category,
    price: Number(price) || 0,
    date,
    location,
    capacity: Number(capacity) || 0,
    images: Array.isArray(images) ? images : [],
    isFeatured: false,
    likes: [] as string[],
    likesCount: 0,
    createdAt: new Date(),
  };

  const result = await db.collection("events").insertOne(newEvent);

  return NextResponse.json({ success: true, insertedId: result.insertedId });
}

export async function GET(request: NextRequest) {
  const organizerId = request.nextUrl.searchParams.get("organizerId");
  const filter = organizerId ? { organizerId } : {};
  const events = await db.collection("events").find(filter).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(events);
}