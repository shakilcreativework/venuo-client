"use client";

import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import Loading from "@/components/ui/Loading";

interface Stats {
  totalEvents: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
}

interface AdminEvent {
  _id: string;
  title: string;
  organizerName?: string;
  category: string;
  price: number;
  date: string;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      const [statsRes, eventsRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats", { credentials: "include" }),
        fetch("/api/admin/events", { credentials: "include" }),
        fetch("/api/admin/users", { credentials: "include" }),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loading text="Loading admin dashboard..." fullScreen />;
  }

  return (
    <main className="py-12">
      <Container>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Platform-wide overview and management.</p>

        {stats && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total Events", value: stats.totalEvents },
              { label: "Total Users", value: stats.totalUsers },
              { label: "Total Bookings", value: stats.totalBookings },
              { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">All Events</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Organizer</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className="px-4 py-3 font-medium text-foreground">{event.title}</td>
                    <td className="px-4 py-3 text-muted">{event.organizerName ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">{event.category}</td>
                    <td className="px-4 py-3 text-primary">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingId === event._id}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-500 hover:border-red-500 disabled:opacity-50"
                      >
                        {deletingId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">All Users</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium capitalize text-secondary">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </main>
  );
}