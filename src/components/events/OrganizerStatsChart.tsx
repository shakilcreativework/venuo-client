"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StatRow {
  eventId: string;
  title: string;
  ticketsSold: number;
  revenue: number;
}

export default function OrganizerStatsChart({ data }: { data: StatRow[] }) {
  if (data.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Tickets Sold Per Event</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="title"
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            {/* Fixed hex rather than var(--primary) — SVG fill attributes don't
                reliably resolve CSS custom properties across all browsers. */}
            <Bar dataKey="ticketsSold" fill="#F97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}