# Venuo

**Discover, book, and host unforgettable events — a full-stack TypeScript event booking platform.**

Venuo is a production-style full-stack application built with Next.js, TypeScript, MongoDB, and Paddle payments. It lets attendees discover and book real events, and lets organizers create, manage, and sell tickets to their own — with real authentication, real database persistence, and a real payment flow, not mocked data.

**Live demo:** _[add your Vercel URL here after deploying]_
**Demo credentials:** see [Demo Accounts](#demo-accounts) below

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Notes](#architecture-notes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seeding Demo Accounts](#seeding-demo-accounts)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Demo Accounts](#demo-accounts)
- [Deployment (Vercel)](#deployment-vercel)
- [Author](#author)

---

## Features

**Discovery & Browsing**
- Landing page with hero search, 6 category tiles, featured events, stats, testimonials, FAQ, newsletter signup, and organizer CTA
- Explore page with live search, category/location filters, sorting, and pagination
- Event details page with image gallery, overview, key info, conditional reviews, and related events

**Authentication**
- Email/password registration and login with validation
- Google social login
- Role-based accounts (attendee / organizer)
- Demo login (one-click, pre-filled)
- Protected routes with automatic redirect to login

**Organizer Tools**
- Create Event form with image upload (imgbb) or URL, full validation
- Manage Events dashboard with a real-time ticket sales chart (Recharts)
- View / delete own events

**Payments**
- Real checkout flow via Paddle (works globally, including regions Stripe doesn't support)
- Free events confirm instantly; paid events confirm via verified webhook
- My Bookings page showing ticket status (Pending / Confirmed)

**Design**
- Fully responsive (mobile, tablet, desktop)
- Light/dark theme support
- Consistent design system: shared color tokens, card radius, spacing scale
- No placeholder/lorem-ipsum content — every page ships with real, written copy

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, HeroUI |
| Auth | better-auth (email/password + Google OAuth) |
| Database | MongoDB (Atlas) |
| Payments | Paddle Billing (Checkout + Webhooks) |
| Charts | Recharts |
| Animation | Framer Motion |
| Media | Swiper (galleries), imgbb (image hosting) |
| Icons | react-icons |

---

## Architecture Notes

This project deliberately uses **Next.js API Routes** as its backend rather than a separate Express server. A standalone Express server (`venuo-server/`) was built during development, but was not used in the final architecture — here's why:

Authentication (via `better-auth`) manages sessions through browser cookies scoped to the Next.js app. A separate Express server would need cross-origin cookie forwarding, shared secrets, and CORS credential handling to share that session — solvable, but unnecessary complexity for what this project needs. Keeping auth-protected reads/writes inside Next.js API routes (`src/app/api/**`) meant the session was already available server-side with zero extra plumbing, and Vercel deploys those routes as serverless functions automatically alongside the frontend — one deployment, one URL, no CORS configuration at all.

This is a valid choice per the assignment's own tech stack options ("Node.js and Express.js **/ Next.js API Routes**"), not a fallback.

---

## Getting Started

### Prerequisites
- Node.js 20+
- A MongoDB Atlas cluster (free tier is enough)
- A Paddle sandbox account (free) for payment testing
- An imgbb account (free) for image uploads
- (Optional) Google Cloud OAuth credentials for social login

### Installation

```bash
git clone <your-repo-url>
cd venuo-client
npm install
```

Create `.env` in the project root (see [Environment Variables](#environment-variables) below), then:

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file with the following:

```env
# Database
MONGODB_URI=mongodb://<user>:<password>@<host1>,<host2>,<host3>/?ssl=true&replicaSet=<name>&authSource=admin&appName=<app>

# Auth
BETTER_AUTH_SECRET=<a long random string>
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Image upload
NEXT_PUBLIC_IMGBB_API_KEY=

# Payments (Paddle)
PADDLE_API_KEY=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_PADDLE_ENV=sandbox
```

> **Tip:** Use a standard (`mongodb://`) connection string with explicit hosts rather than `mongodb+srv://` if you run into DNS SRV resolution issues on your network — this app was built against a standard connection string for exactly that reason.

---

## Seeding Demo Accounts

```bash
npm install -D tsx dotenv
npx tsx scripts/seed-demo-users.ts
```

Creates two accounts directly through the real auth system (not a database shortcut):
- `demo@venuo.app` — attendee role
- `organizer@venuo.app` — organizer role

Safe to re-run; existing accounts are skipped.

---

## Project Structure

```
src/
  app/
    (public pages)         → /, /events, /events/[id], /about, /contact
    login/, register/
    items/add/, items/manage/     → protected, organizer-only
    admin/                         → protected, admin-only dashboard
    checkout/[eventId]/           → protected
    dashboard/bookings/           → protected
    api/
      auth/[...all]/       → better-auth handler
      events/              → CRUD for events
      bookings/            → user's bookings
      checkout/            → Paddle transaction creation
      webhooks/paddle/     → payment confirmation
      organizer/stats/     → ticket sales aggregation
      contact/             → contact form submissions
  components/
    shared/                → Navbar, Footer, Container, EventCard, etc.
    home/                  → landing page sections
    events/                → EventDetailClient, CheckoutClient, charts
    ui/                    → BaseButton, FormField, Loading, etc.
  lib/                     → auth.ts, auth-client.ts, paddle.ts, utils.ts
  types/                   → shared TypeScript types
  data/                    → (legacy mock data, safe to remove)
  proxy.ts                 → route protection (Next.js 16 middleware convention)
  instrumentation.ts       → server startup hooks
scripts/
  seed-demo-users.ts
```

---

## API Routes

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET/POST | `/api/events` | POST protected | List / create events |
| GET/DELETE | `/api/events/[id]` | DELETE protected | View / delete one event |
| GET | `/api/bookings` | Protected | Current user's bookings |
| POST | `/api/checkout` | Protected | Create a Paddle transaction |
| POST | `/api/webhooks/paddle` | Signature-verified | Confirm payment, mark booking paid |
| GET | `/api/organizer/stats` | Protected | Ticket sales per event |
| GET | `/api/admin/events` | Admin only | All events across all organizers |
| GET | `/api/admin/users` | Admin only | All registered users |
| GET | `/api/admin/stats` | Admin only | Platform-wide totals (events, users, bookings, revenue) |
| POST | `/api/contact` | Public | Store contact form submissions |
| ALL | `/api/auth/[...all]` | — | better-auth handler |

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Attendee | `demo@venuo.app` | `Demo1234!` |
| Organizer | `organizer@venuo.app` | `Organizer1234!` |
| Admin | `admin@venuo.app` | `Admin1234!` |

Or use the **"Try the demo account"** button on the login page (attendee only — log in manually for organizer/admin).

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **New Project** → import the repo.
3. Add every variable from [Environment Variables](#environment-variables) in **Project Settings → Environment Variables** — update `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://venuo.vercel.app`) and `NEXT_PUBLIC_PADDLE_ENV` to `production` when you're ready to go live (keep `sandbox` for a safe demo).
4. Deploy.
5. Update your **Paddle webhook destination** URL to `https://<your-domain>/api/webhooks/paddle` (Paddle needs your real, public URL — not localhost/ngrok — once deployed).
6. Update your **Google OAuth** authorized redirect URI to match your production domain, if using Google login.

That's the entire deployment — frontend and backend (API routes) ship together in one build, one URL.

---

## Author

Built by Shakil Ahmed as a full-stack TypeScript learning project — React/Next.js, authentication, database design, payment integration, and responsive UI/UX.
