"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Container from "@/components/shared/Container";
import EventCard from "@/components/shared/EventCard";
import BaseButton from "@/components/ui/BaseButton";
import { mockEventDetails } from "@/data/mock-event-details";
import { mockEvents } from "@/data/mock-events";

interface EventDetailClientProps {
  id: string;
}

export default function EventDetailClient({ id }: EventDetailClientProps) {
  const event = mockEventDetails.find((e) => e._id === id);
  const [quantity, setQuantity] = useState(1);

  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return mockEvents
      .filter((e) => e._id !== event._id && e.category === event.category)
      .slice(0, 4);
  }, [event]);

  if (!event) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-xl font-semibold text-foreground">Event not found</h1>
        <Link href="/events" className="mt-4 inline-block text-sm text-primary hover:text-primary-hover">
          ← Back to Explore
        </Link>
      </Container>
    );
  }

  const priceLabel = event.price === 0 ? "Free" : `$${event.price}`;
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const averageRating = event.reviews?.length
    ? event.reviews.reduce((sum, r) => sum + r.rating, 0) / event.reviews.length
    : null;

  return (
    <main className="pt-10 pb-40">
      <Container>
        <Link href="/events" className="text-sm text-muted hover:text-foreground">
          ← Back to Explore
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left column: gallery + content */}
          <div className="lg:col-span-2">
            <Swiper spaceBetween={12} slidesPerView={1} className="overflow-hidden rounded-xl">
              {event.images.map((src, i) => (
                <SwiperSlide key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    className="h-80 w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <span className="mt-6 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              {event.category}
            </span>
            <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{event.title}</h1>
            <p className="mt-1 text-sm text-muted">Hosted by {event.organizerName}</p>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Overview</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{event.fullDescription}</p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Key Information</h2>
              <dl className="mt-3 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-muted">Date</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{formattedDate}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Location</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Capacity</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{event.capacity} spots</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Price</dt>
                  <dd className="mt-1 text-sm font-medium text-primary">{priceLabel}</dd>
                </div>
              </dl>
            </section>

            {event.reviews && event.reviews.length > 0 && (
              <section className="mt-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
                  {averageRating && (
                    <span className="text-sm text-muted">
                      {averageRating.toFixed(1)} / 5 ({event.reviews.length})
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  {event.reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{review.author}</span>
                        <span className="text-xs text-primary">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {relatedEvents.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold text-foreground">Related Events</h2>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {relatedEvents.map((e) => (
                    <EventCard key={e._id} event={e} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column: sticky buy panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <div className="text-2xl font-semibold text-primary">{priceLabel}</div>
              <p className="mt-1 text-xs text-muted">per ticket</p>

              <div className="mt-5 flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-sm text-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground hover:border-primary"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(event.capacity, q + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground hover:border-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              <BaseButton
                as="link"
                href={`/checkout/${event._id}`}
                text="Book Now"
                className="mt-5 w-full justify-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}