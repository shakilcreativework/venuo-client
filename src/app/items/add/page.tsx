"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import ImageUploadField from "@/components/ui/ImageUploadField";
import BaseButton from "@/components/ui/BaseButton";

const categories = ["Technology", "Music", "Business", "Art & Culture", "Food & Drink", "Wellness"];

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: categories[0],
    price: "",
    date: "",
    location: "",
    capacity: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.shortDescription.trim()) next.shortDescription = "Short description is required.";
    if (!form.fullDescription.trim()) next.fullDescription = "Full description is required.";
    if (!form.date) next.date = "Date is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (form.price && isNaN(Number(form.price))) next.price = "Price must be a number.";
    if (form.capacity && isNaN(Number(form.capacity))) next.capacity = "Capacity must be a number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          shortDescription: form.shortDescription,
          fullDescription: form.fullDescription,
          category: form.category,
          price: form.price ? Number(form.price) : 0,
          date: form.date,
          location: form.location,
          capacity: form.capacity ? Number(form.capacity) : 0,
          images: form.imageUrl ? [form.imageUrl] : [],
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrors({ form: data?.error ?? "Could not create the event." });
        return;
      }

      router.push("/items/manage");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-12 pb-40">
      <Container className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Create Event</h1>
        <p className="mt-1 text-sm text-muted">Fill in the details below to list your event.</p>

        {errors.form && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">
            {errors.form}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
        >
          <FormField
            label="Title"
            name="title"
            value={form.title}
            error={errors.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Dhaka Tech Summit 2026"
          />

          <FormField
            label="Short description"
            name="shortDescription"
            value={form.shortDescription}
            error={errors.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            placeholder="One line shown on the event card"
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullDescription" className="text-sm font-medium text-foreground">
              Full description
            </label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              rows={5}
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
              placeholder="Describe what attendees can expect"
              className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
            />
            {errors.fullDescription && (
              <span className="text-xs text-red-500">{errors.fullDescription}</span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Price ($, 0 = free)"
              name="price"
              type="number"
              min={0}
              value={form.price}
              error={errors.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Date"
              name="date"
              type="date"
              value={form.date}
              error={errors.date}
              onChange={(e) => update("date", e.target.value)}
            />
            <FormField
              label="Capacity"
              name="capacity"
              type="number"
              min={0}
              value={form.capacity}
              error={errors.capacity}
              onChange={(e) => update("capacity", e.target.value)}
              placeholder="e.g. 100"
            />
          </div>

          <FormField
            label="Location"
            name="location"
            value={form.location}
            error={errors.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Dhaka, Bangladesh"
          />

          <ImageUploadField
            value={form.imageUrl}
            onChange={(url) => update("imageUrl", url)}
          />

          <BaseButton
            type="submit"
            text="Submit"
            loading={loading}
            className="mt-2 w-full justify-center sm:w-auto"
          />
        </form>
      </Container>
    </main>
  );
}