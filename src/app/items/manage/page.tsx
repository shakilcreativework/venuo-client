"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Container from "@/components/shared/Container";
import BaseButton from "@/components/ui/BaseButton";
import OrganizerStatsChart from "@/components/events/OrganizerStatsChart";

interface OrganizerEvent {
  _id: string;
  title: string;
  date: string;
  price: number;
  images: string[];
}

interface StatRow {
  eventId: string;
  title: string;
  ticketsSold: number;
  revenue: number;
}

export default function ManageEventsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [stats, setStats] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const fetchData = async () => {
      try {
        const [eventsRes, statsRes] = await Promise.all([
          fetch(`/api/events?organizerId=${session.user.id}`),
          fetch("/api/organizer/stats", { credentials: "include" }),
        ]);
        const eventsData = await eventsRes.json();
        setEvents(eventsData);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
      }
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (sessionLoading || loading) {
    return (
      <main className="py-12">
        <Container>
          <p className="text-sm text-muted">Loading your events...</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-12">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">My Events</h1>
            <p className="mt-1 text-sm text-muted">Manage the events you&apos;ve created.</p>
          </div>
          <BaseButton as="link" href="/items/add" text="Create Event" />
        </div>

        {stats.length > 0 && <OrganizerStatsChart data={stats} />}

        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
            <p className="text-sm text-muted">You haven&apos;t created any events yet.</p>
            <BaseButton as="link" href="/items/add" text="Create your first event" variant="outline" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className="flex items-center gap-3 px-4 py-3">
                      {event.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={event.images[0]}
                          alt={event.title}
                          className="h-10 w-14 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-10 w-14 rounded-md bg-surface" />
                      )}
                      <span className="font-medium text-foreground">{event.title}</span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-primary">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                        Published
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/events/${event._id}`}
                          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                        >
                          View
                        </Link>

                        {confirmId === event._id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDelete(event._id)}
                              disabled={deletingId === event._id}
                              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
                            >
                              {deletingId === event._id ? "Deleting..." : "Confirm"}
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(event._id)}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-500 hover:border-red-500"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </main>
  );
}