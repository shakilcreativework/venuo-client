# Venuo — Event & Experience Booking Platform
### Full Stack TypeScript Project Plan & Setup Guide

---

## 1. Project Idea & Why

**Venuo** is a platform where organizers list events/experiences (workshops, concerts,
meetups, retreats, classes) and attendees discover, filter, and book tickets — with real
payment checkout.

**Why this idea over alternatives:** almost every requirement in the assignment maps onto
a *real* piece of an event platform instead of being forced in:

| Assignment requirement | Maps to |
|---|---|
| Card listing (image, title, desc, meta, view details) | Event card: cover image, title, short blurb, price/date/location, "View Details" |
| Details page (media, overview, specs, reviews, related) | Event gallery, description, schedule/venue/capacity, attendee reviews, "similar events" |
| Filtering (2+ fields) | Category, date, price range, location |
| Sorting | Price, date, popularity |
| Search | Event/venue/organizer name |
| Add Item (protected) | "Create Event" form (organizer) |
| Manage Items (protected) | "My Events" dashboard with view/delete |
| Payment | Ticket checkout via Stripe or Paddle |
| Auth (login/register/demo/social) | Attendee + organizer accounts, Google login via better-auth |
| 7+ landing sections | Hero search, Categories, Featured Events, How It Works, Stats, Testimonials, FAQ, Newsletter, CTA |
| Additional pages | About, Contact, Blog, Help |

---

## 2. Core Data Models

```ts
// User
{
  _id, name, email, passwordHash (handled by better-auth),
  role: "attendee" | "organizer",
  avatarUrl?, createdAt
}

// Event
{
  _id, organizerId, title, shortDescription, fullDescription,
  category, price, currency, date, location, capacity,
  images: string[], status: "published" | "draft",
  createdAt
}

// Booking (created after successful payment)
{
  _id, eventId, userId, quantity, totalPaid, currency,
  paymentProvider: "stripe" | "paddle",
  paymentStatus: "pending" | "paid" | "refunded",
  createdAt
}

// Review
{
  _id, eventId, userId, rating (1-5), comment, createdAt
}
```

---

## 3. Page-by-Page Breakdown

**Public**
- `/` — Landing page (see sections below)
- `/events` — Explore page: search, filters (category, price, date, location), sort, pagination
- `/events/[id]` — Details: gallery, overview, schedule/specs, reviews, related events, "Buy Ticket" CTA
- `/about`, `/contact`, `/blog`, `/help`

**Auth**
- `/login` — with Demo Login button (auto-fills a seeded demo attendee/organizer) + Google login
- `/register`

**Protected**
- `/events/add` — Create event form (organizer role; redirect to `/login` if unauthenticated)
- `/events/manage` — Organizer's event list/grid, View/Delete actions
- `/checkout/[eventId]` — Payment flow (Stripe or Paddle)
- `/dashboard/bookings` — Attendee's purchased tickets (nice extra, not required but easy win)

**Landing page sections (7+):**
1. Hero — search bar + CTA, height-capped, Swiper/Framer Motion for visual interest
2. Categories — workshops, concerts, meetups, etc.
3. Featured Events — top-rated/upcoming
4. How It Works — 3-step flow (discover → book → attend)
5. Stats — events hosted, cities, happy attendees (animated counters)
6. Testimonials — attendee quotes (real, written by you — not lorem ipsum)
7. FAQ — accordion
8. Newsletter signup
9. CTA — "Become an organizer"

---

## 4. Payment: Stripe vs Paddle (decide later, design for either)

| | Stripe | Paddle |
|---|---|---|
| Integration style | You handle tax/VAT yourself (or Stripe Tax add-on) | Paddle acts as merchant of record, handles global tax automatically |
| Best for | Direct control, most common in tutorials/docs | Selling internationally without VAT/tax headaches |
| SDKs already in your `package.json` | `@stripe/stripe-js`, `stripe` ✅ | Would need `@paddle/paddle-js` added |
| Checkout UX | Stripe Checkout (hosted) or Elements (embedded) | Paddle.js overlay or inline checkout |

**Recommendation:** since `stripe` and `@stripe/stripe-js` are already in your dependencies,
start with **Stripe Checkout (hosted)** — it's the fastest to implement correctly and keeps
PCI compliance off your plate entirely. You can abstract the payment call behind a single
`createCheckoutSession(eventId, quantity)` function so swapping to Paddle later only means
rewriting that one function, not your booking/database logic.

Either way, keep `paymentProvider` and `paymentStatus` fields on the Booking model from day
one — that's what makes the swap painless.

---

## 5. Step-by-Step Setup Guide

### A. Prerequisites
- Node.js 20+ installed
- A MongoDB Atlas account (free tier is enough) → create a cluster → get your connection string
- A Stripe account (test mode) → get your publishable + secret test keys
- (Optional) Google Cloud Console → OAuth client ID/secret for social login

### B. Client setup (`client/`)
```bash
npx create-next-app@latest client --typescript --tailwind --app
cd client

# Install the stack from your package.json
npm install @better-auth/mongo-adapter @gravity-ui/icons @heroui/react @heroui/styles \
  @stripe/stripe-js better-auth clsx date-fns framer-motion mongodb next-themes \
  react-fast-marquee react-hot-toast react-icons stripe swiper tailwind-merge

npm install -D @types/node @types/react @types/react-dom typescript
```
1. Replace `tsconfig.json` with the one provided (`client-tsconfig.json`).
2. Drop your theme into `app/globals.css` (your file is already correct as-is).
3. Create `.env.local` from `.env.example` and fill in `MONGODB_URI`, `BETTER_AUTH_SECRET`,
   `GOOGLE_CLIENT_ID/SECRET`, Stripe keys.
4. Set up `lib/auth.ts` (provided) and mount the handler at
   `app/api/auth/[...all]/route.ts`.
5. Wrap `app/layout.tsx` with HeroUI's provider and `next-themes` `ThemeProvider`.

### C. Server setup (`server/`) — optional, for Stripe webhooks / extra API surface
```bash
mkdir server && cd server
npm init -y
npm install cors dotenv express mongodb
npm install -D @types/cors @types/express @types/node tsx typescript
```
1. Add `tsconfig.json` (provided) and update `package.json` scripts to:
   `dev: tsx watch src/index.ts`, `build: tsc`, `start: node dist/index.js`.
2. Create `src/index.ts` (starter provided) with your MongoDB connection.
3. Add `.env` with `MONGODB_URI` and `PORT`.

### D. Build order (recommended)
1. MongoDB connection + User/Event/Booking/Review models
2. better-auth setup (register/login/demo login/Google)
3. Middleware protecting `/events/add`, `/events/manage`, `/checkout/*`
4. Landing page sections (build reusable `ui/` components first: Card, Button, Skeleton)
5. Explore page: cards grid + skeleton loader + search/filter/sort + pagination
6. Details page: gallery (Swiper), overview, specs, reviews, related events
7. Create Event / Manage Events pages
8. Stripe Checkout integration → webhook to mark Booking as "paid"
9. Responsive + accessibility pass, remove any placeholder content
10. Deploy (Vercel for client, Render/Railway for server if used) + write README with demo credentials

---

## 6. Submission Checklist (from your assignment doc)
- [ ] Live URL (Vercel)
- [ ] GitHub repo link(s) — client + server
- [ ] Demo credentials: one attendee account, one organizer ("admin") account
- [ ] All 12 assignment sections verified against this doc
