"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Container from "./Container";
import { ThemeSwitch } from "./ThemeSwitch";
import BaseButton from "@/components/ui/BaseButton";
import { useSession, signOut } from "@/lib/auth-client";

const loggedOutLinks = [
  { href: "/events", label: "Explore" },
  { href: "/events?view=categories", label: "Categories" },
  { href: "/about", label: "About" },
];

const loggedInLinks = [
  { href: "/events", label: "Explore" },
  { href: "/events?view=categories", label: "Categories" },
  { href: "/items/add", label: "Create Event" },
  { href: "/items/manage", label: "My Events" },
  { href: "/dashboard/bookings", label: "My Bookings" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggedIn = !!session?.user;
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const links = isLoggedIn
    ? isAdmin
      ? [...loggedInLinks, { href: "/admin", label: "Admin" }]
      : loggedInLinks
    : loggedOutLinks;

  const handleLogout = async () => {
    await signOut();
    setProfileOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            Venuo
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeSwitch />

            {!isPending && !isLoggedIn && (
              <>
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary">
                  Log in
                </Link>
                <BaseButton as="link" href="/register" text="Sign up" size="sm" />
              </>
            )}

            {!isPending && isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  aria-label="Open profile menu"
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-white"
                >
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name ?? "Profile"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    session.user.name?.[0]?.toUpperCase() ?? "U"
                  )}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 rounded-lg border border-border bg-card p-1.5 shadow-lg"
                    >
                      <Link
                        href="/dashboard/bookings"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-surface"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-500 hover:bg-surface"
                      >
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="text-2xl text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </nav>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <ThemeSwitch />
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <BaseButton as="link" href="/login" text="Log in" variant="outline" size="sm" />
                    <BaseButton as="link" href="/register" text="Sign up" size="sm" />
                  </div>
                ) : (
                  <BaseButton text="Log out" variant="outline" size="sm" onClick={handleLogout} />
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}