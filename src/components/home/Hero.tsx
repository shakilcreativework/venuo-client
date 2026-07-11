"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiCalendar } from "react-icons/fi";
import BaseButton from "@/components/ui/BaseButton";
import Container from "../shared/Container";

const trendingTags = ["Technology", "Music", "Business", "Art & Culture", "Food & Drink", "Wellness"];

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    router.push(`/events?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/events?category=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-background">
      {/* Ambient background glow — no external images needed */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Find your next <span className="text-primary">unforgettable</span> experience.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Discover workshops, concerts, and meetups happening near you — and book your spot in
            seconds.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <FiSearch className="shrink-0 text-muted" />
            <input
              id="hero-search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, artists, venues..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>

          <div className="hidden h-6 w-px bg-border sm:block" />

          <div className="flex items-center gap-2 px-2">
            <FiMapPin className="shrink-0 text-muted" />
            <input
              id="hero-location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted sm:w-28"
            />
          </div>

          <div className="hidden h-6 w-px bg-border sm:block" />

          <div className="flex items-center gap-2 px-2">
            <FiCalendar className="shrink-0 text-muted" />
            <input
              id="hero-date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none sm:w-32"
            />
          </div>

          <BaseButton type="submit" text="Search" className="w-full sm:w-auto" />
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-muted">Trending:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {["A", "B", "C"].map((letter, i) => (
              <div
                key={letter}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-semibold text-white"
                style={{ zIndex: 3 - i }}
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted">Trusted by 50,000+ event goers worldwide</span>
        </motion.div>
      </Container>
    </section>
  );
}