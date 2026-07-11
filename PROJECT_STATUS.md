# Venuo — Build Status & TODO

Last updated after: Manage Events page confirmed working with real MongoDB data.

---

## ✅ Fully Complete (real, working, database-backed)

| Item | Notes |
|---|---|
| Server (`venuo-server`) running | Built, but **not currently used** by the live app — see "Decision Needed" below |
| MongoDB connection | Both client and server connect successfully (standard connection string, no more DNS issues) |
| better-auth setup | Register, login, session, role field (attendee/organizer) |
| Login / Register pages | Working, with validation, password show/hide toggle |
| Google social login | Wired up — **not yet confirmed working end-to-end** (needs real Google OAuth credentials tested) |
| Route protection (`proxy.ts`) | `/items/add`, `/items/manage`, `/checkout/*` redirect to `/login` when logged out |
| Navbar | Logged-out (3 routes) / logged-in (5 routes), sticky, responsive, avatar shows real photo or initials |
| Footer | Working links, contact info, social icons |
| Hero section | Search bar, trending tags, social proof — all functional |
| Landing page sections | All 8 built: Featured Events, How It Works, Categories, Stats, Testimonials, FAQ, Newsletter, CTA |
| `EventCard` + `EventCardSkeleton` | Reusable, consistent radius/sizing, 4-per-row desktop |
| Explore page (`/events`) | Search, 3 filters, sort, pagination — all functional |
| Event Details page (`/events/[id]`) | Gallery, overview, specs, conditional reviews, related events, buy panel |
| Create Event (`/items/add`) | **Real** — writes to MongoDB via `/api/events` (Next.js route), image upload via imgbb or URL |
| Manage Events (`/items/manage`) | **Real** — reads/deletes from MongoDB, ownership-checked |

---

## ⚠️ Using Mock Data (needs to be swapped before submission)

| Item | Current state | What to do |
|---|---|---|
| Featured Events (homepage) | Local `mock-events.ts` array | Swap to `fetch('/api/events?featured=true')` — you now have real events in MongoDB to fetch instead |
| Explore page | Local `mock-events.ts` array | Same — swap to a real `fetch('/api/events')` call |
| Event Details page | Local `mock-event-details.ts` | Needs its own real fetch (`/api/events/[id]`, already built) — currently only mock IDs resolve |

**Why this matters:** your assignment explicitly grades on real database-backed content. Now that `/items/add` genuinely writes to MongoDB, switching these three back to live fetches should be straightforward — the commented-out fetch code is already sitting in `FeaturedEvents.tsx` and `events/page.tsx` waiting to be uncommented.

---

## ❌ Not Started Yet

| Item | Priority |
|---|---|
| **Payment integration (Stripe or Paddle)** | High — `/checkout/[eventId]` is linked from the Details page but the page itself doesn't exist yet |
| **Additional pages: About, Contact** (minimum 2 required) | High — linked in Navbar/Footer but pages return 404 right now |
| Blog, Help/Support (bonus pages) | Low — optional, only if time allows |
| Reviews submission (attendees leaving a review) | Low — spec says reviews are "if applicable"; current reviews are read-only mock data, which is acceptable, but a real review form would strengthen this |
| Recharts/Chart.js usage | Medium — required in your tech stack but not used anywhere yet. Natural fit: a small stats chart on an organizer dashboard, or on the About page |
| Demo login — end-to-end verification | Medium — button exists and logic is correct, but needs the seed script actually run and confirmed working after all the DNS fixes |
| Final responsive/accessibility pass | Medium — spot-check every page at mobile/tablet widths before submission |
| Deployment | High — nothing is live yet (Vercel for client; server only needed if you decide to keep using it) |

---

## 🤔 Decision Needed: What to do with `venuo-server`

Right now your Express server exists, runs, and has working event CRUD routes — but the live app doesn't call it (Next.js API routes handle everything instead, due to the better-auth cookie/session architecture). Three options:

1. **Deploy it anyway and mention it in your README** as evidence of backend/Express skills, even if unused by the live app — honest but slightly awkward for grading.
2. **Repurpose it** for something the Next.js app *does* call — e.g., Stripe webhook handling, since webhooks don't need session cookies at all and are a natural fit for a standalone server.
3. **Drop it from the final submission** and rely entirely on Next.js API routes, updating your project docs to reflect "Next.js API Routes" as your chosen backend (your assignment explicitly allows this as an alternative to Express).

Worth deciding this before your final GitHub push and README, since your submission checklist asks for "GitHub Repository Link (frontend and backend)" — if you go with option 3, you'd only submit one repo link, or note the second as supplementary/unused.

---

## Suggested Order From Here

1. Swap the 3 mock-data spots to real fetches (quick win, high grading impact)
2. Build About + Contact pages (clears the "2 additional pages" requirement)
3. Stripe Checkout page + webhook (biggest remaining feature)
4. Decide + resolve the `venuo-server` question above
5. Verify demo login end-to-end
6. Add a small Recharts chart somewhere reasonable
7. Full responsive pass
8. Deploy + write final README with live URL, both repo links, demo credentials