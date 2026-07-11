"use client";

import { useState, type FormEvent } from "react";
import BaseButton from "@/components/ui/BaseButton";
import Container from "../shared/Container";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire this up to a real newsletter provider or your own API route
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Stay in the loop</h2>
          <p className="mt-2 text-sm text-muted">
            Get updates on new events, exclusive offers, and event tips delivered to your inbox.
          </p>

          {submitted ? (
            <p className="mt-6 text-sm font-medium text-success">
              You&apos;re subscribed — thanks for joining!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
              />
              <BaseButton type="submit" text="Subscribe" />
            </form>
          )}

          <p className="mt-3 text-xs text-muted">No spam, unsubscribe anytime.</p>
        </div>
      </Container>
    </section>
  );
}