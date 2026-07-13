import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid event id." }, { status: 400 });
  }

  const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

  if (!event) {
    return NextResponse.json({ success: false, error: "Event not found." }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid event id." }, { status: 400 });
  }

  const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

  if (!event) {
    return NextResponse.json({ success: false, error: "Event not found." }, { status: 404 });
  }

  const isOwner = event.organizerId === session.user.id;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { success: false, error: "You can only delete your own events." },
      { status: 403 },
    );
  }

  await db.collection("events").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}