"use client";

import { useState, type FormEvent } from "react";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import BaseButton from "@/components/ui/BaseButton";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setErrors({ form: "Could not send your message. Please try again." });
        return;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-16 pb-40">
      <Container className="max-w-4xl">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">Contact</span>
          <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">Get in touch</h1>
          <p className="mt-3 text-sm text-muted">
            Questions about an event, a booking, or hosting on Venuo? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            {submitted ? (
              <p className="text-sm font-medium text-success">
                Thanks for reaching out — we&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {errors.form && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">
                    {errors.form}
                  </div>
                )}
                <FormField
                  label="Name"
                  name="name"
                  value={form.name}
                  error={errors.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                />
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="How can we help?"
                    className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                </div>
                <BaseButton
                  type="submit"
                  text="Send Message"
                  loading={loading}
                  className="mt-2 w-full justify-center"
                />
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground">Contact information</h2>
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
                <a href="mailto:support@venuo.app" className="hover:text-foreground">
                  support@venuo.app
                </a>
                <a href="tel:+8801305330393" className="hover:text-foreground">
                  +880 1305-330393
                </a>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-surface text-sm text-muted">
              Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}