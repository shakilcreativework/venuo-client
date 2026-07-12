"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Loading from "@/components/ui/Loading";
import BaseButton from "@/components/ui/BaseButton";

interface Booking {
  _id: string;
  quantity: number;
  totalPaid: number;
  paymentStatus: string;
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
    images: string[];
  } | null;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <Loading text="Loading your bookings..." fullScreen />;
  }

  return (
    <main className="py-12">
      <Container>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">My Bookings</h1>
        <p className="mt-1 text-sm text-muted">Tickets you&apos;ve booked for upcoming events.</p>

        {bookings.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
            <p className="text-sm text-muted">You haven&apos;t booked any events yet.</p>
            <BaseButton as="link" href="/events" text="Explore events" variant="outline" />
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
              >
                {booking.event?.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={booking.event.images[0]}
                    alt={booking.event.title}
                    className="h-20 w-28 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-20 w-28 shrink-0 rounded-lg bg-surface" />
                )}

                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {booking.event?.title ?? "Event no longer available"}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {booking.event?.date &&
                      new Date(booking.event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    {booking.event?.location ? ` · ${booking.event.location}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted">Qty: {booking.quantity}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-success/15 text-success"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {booking.paymentStatus === "paid" ? "Confirmed" : "Pending"}
                  </span>
                  {booking.event && (
                    <Link
                      href={`/events/${booking.event._id}`}
                      className="text-xs font-medium text-primary hover:text-primary-hover"
                    >
                      View event →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}