"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import EventCard from "@/components/shared/EventCard";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import { EventSummary } from "@/types/event";

export default function FeaturedEvents() {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to load events.");
        const data: EventSummary[] = await res.json();
        // Show the 4 most recent events as "featured" for now.
        setEvents(data.slice(0, 4));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={i} />)
          ) : events.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="col-span-full py-10 text-center text-sm text-muted">
              No events yet — be the first to{" "}
              <Link href="/items/add" className="text-primary hover:text-primary-hover">
                create one
              </Link>
              .
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}