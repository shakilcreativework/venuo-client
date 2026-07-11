import EventDetailClient from "@/components/events/EventDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <EventDetailClient id={id} />;
}