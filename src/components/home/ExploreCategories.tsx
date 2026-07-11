import Link from "next/link";
import Container from "../shared/Container";
import { FiCpu, FiMusic, FiBriefcase, FiFeather, FiCoffee, FiHeart } from "react-icons/fi";

const categories = [
  { icon: FiCpu, label: "Technology" },
  { icon: FiMusic, label: "Music" },
  { icon: FiBriefcase, label: "Business" },
  { icon: FiFeather, label: "Art & Culture" },
  { icon: FiCoffee, label: "Food & Drink" },
  { icon: FiHeart, label: "Wellness" },
];

export default function ExploreCategories() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-primary">
              Browse by Category
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              Find events that inspire you
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden text-sm font-medium text-primary hover:text-primary-hover sm:block"
          >
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, label }) => (
            <Link
              key={label}
              href={`/events?category=${encodeURIComponent(label)}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="text-xl" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}