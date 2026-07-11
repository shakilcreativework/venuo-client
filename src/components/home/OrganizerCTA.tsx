import Link from "next/link";
import BaseButton from "@/components/ui/BaseButton";
import Container from "../shared/Container";

export default function OrganizerCTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Organize unforgettable events with Venuo
            </h2>
            <p className="mt-2 text-sm text-muted">
              Reach a wider audience and manage bookings from one dashboard.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <Link
              href="/about"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-border-hover"
            >
              Learn more
            </Link>
            <BaseButton as="link" href="/items/add" text="List your event" />
          </div>
        </div>
      </Container>
    </section>
  );
}