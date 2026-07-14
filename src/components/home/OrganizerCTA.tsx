import Link from "next/link";
import BaseButton from "@/components/ui/BaseButton";
import Container from "../shared/Container";

export default function OrganizerCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-6 text-center sm:p-8 md:flex-row md:p-10 md:text-left">
          <div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
              Organize unforgettable events with Venuo
            </h2>
            <p className="mt-2 text-sm text-muted">
              Reach a wider audience and manage bookings from one dashboard.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:w-auto">
            <Link
              href="/about"
              className="text-nowrap flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-border-hover"
            >
              Learn more
            </Link>
            <BaseButton
              as="link"
              href="/items/add"
              text="List your event"
              className="text-nowrap w-full justify-center xs:w-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}