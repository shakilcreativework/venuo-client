import { Suspense } from "react";
import CheckoutClient from "@/components/events/CheckoutClient";
import Loading from "@/components/ui/Loading";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { eventId } = await params;

  return (
    <Suspense fallback={<Loading text="Loading checkout..." fullScreen />}>
      <CheckoutClient eventId={eventId} />
    </Suspense>
  );
}