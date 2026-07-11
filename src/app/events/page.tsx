"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import EventCard from "@/components/shared/EventCard";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import { mockEvents } from "@/data/mock-events";
import { EventSummary } from "@/types/event";

const categories = ["All", "Technology", "Music", "Business", "Art & Culture", "Food & Drink", "Wellness"];
const sortOptions = [
  { value: "date", label: "Date: Soonest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];
const PAGE_SIZE = 8;

export default function ExplorePage() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState<EventSummary[]>([]);

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "All");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);

  // TEMPORARY: local mock data with a simulated load delay.
  // Swap for: fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`).then(...)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllEvents(mockEvents);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Page resets to 1 directly inside each filter's onChange handler below —
  // no separate effect needed, per React's "you might not need an effect" guidance.

  const filteredEvents = useMemo(() => {
    let result = [...allEvents];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) || e.shortDescription.toLowerCase().includes(q),
      );
    }

    if (category !== "All") {
      result = result.filter((e) => e.category === category);
    }

    if (location.trim()) {
      const q = location.trim().toLowerCase();
      result = result.filter((e) => e.location.toLowerCase().includes(q));
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return result;
  }, [allEvents, search, category, location, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const paginatedEvents = filteredEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("");
    setSort("date");
    setPage(1);
  };

  return (
    <main className="pt-12 mb-40">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Explore Events</h1>
          <p className="mt-1 text-sm text-muted">
            {loading ? "Loading events..." : `${filteredEvents.length} events found`}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            id="explore-search"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search events..."
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
          />

          <select
            id="explore-category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            id="explore-location"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            placeholder="Location"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary sm:w-40"
          />

          <select
            id="explore-sort"
            name="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => <EventCardSkeleton key={i} />)
          ) : paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-muted">No events match your filters — try adjusting your search.</p>
              <button
                onClick={handleClearFilters}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "border border-border text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}