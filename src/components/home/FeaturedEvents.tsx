"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import EventCard from "@/components/shared/EventCard";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import { mockEvents } from "@/data/mock-events";
import { EventSummary } from "@/types/event";

export default function FeaturedEvents() {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMPORARY: using local mock data so the UI is visible right away.
    // Once your backend has real events (via /items/add or a seed script),
    // swap this block for the real fetch:
    //
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/featured`)
    //   .then((res) => res.json())
    //   .then(setEvents)
    //   .finally(() => setLoading(false));

    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-primary">
              Featured Events
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              Handpicked experiences
            </h2>
          </div>
          <Link href="/events" className="text-sm font-medium text-primary hover:text-primary-hover">
            View all events →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      </Container>
    </section>
  );
}