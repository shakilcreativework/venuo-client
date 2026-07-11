import Link from "next/link";
import Image from "next/image";
import { EventSummary } from "@/types/event";

interface EventCardProps {
  event: EventSummary;
}

const categoryColors: Record<string, string> = {
  Technology: "bg-primary/15 text-primary",
  Business: "bg-primary/15 text-primary",
  Music: "bg-secondary/15 text-secondary",
  "Art & Culture": "bg-secondary/15 text-secondary",
  "Food & Drink": "bg-success/15 text-success",
  Wellness: "bg-success/15 text-success",
};

export default function EventCard({ event }: EventCardProps) {
  const categoryClass = categoryColors[event.category] ?? "bg-surface text-muted";
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const priceLabel = event.price === 0 ? "Free" : `$${event.price}`;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative h-44 w-full bg-surface">
        {event.images?.[0] ? (
          <Image src={event.images[0]} alt={event.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${categoryClass}`}
        >
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{event.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted">
          <span className="line-clamp-1">{event.location}</span>
          <span className="shrink-0">{formattedDate}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-primary">{priceLabel}</span>
          <Link
            href={`/events/${event._id}`}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}