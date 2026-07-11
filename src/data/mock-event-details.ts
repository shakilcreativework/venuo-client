import { EventDetail } from "@/types/event";

export const mockEventDetails: EventDetail[] = [
  {
    _id: "mock-1",
    title: "Dhaka Tech Summit 2026",
    shortDescription:
      "A full day of talks on AI, product, and the future of software in South Asia.",
    fullDescription:
      "Join over 500 developers, founders, and product leaders for a full day exploring where AI and software development are headed next. Sessions cover practical AI integration, scaling engineering teams, and building products for South Asian markets. Expect hands-on workshops alongside keynote talks, plus plenty of time to network with speakers and fellow attendees between sessions.",
    category: "Technology",
    price: 15,
    date: "2026-10-12",
    location: "Dhaka, Bangladesh",
    capacity: 500,
    organizerName: "Dhaka Tech Community",
    images: [
      "https://picsum.photos/seed/venuo-tech/900/600",
      "https://picsum.photos/seed/venuo-tech-2/900/600",
      "https://picsum.photos/seed/venuo-tech-3/900/600",
    ],
    reviews: [
      {
        id: "r1",
        author: "Imran K.",
        rating: 5,
        comment: "Best tech event I've attended in Dhaka. Great speaker lineup.",
      },
      {
        id: "r2",
        author: "Nusrat J.",
        rating: 4,
        comment: "Really well organized, though the venue got crowded by the afternoon.",
      },
    ],
  },
  {
    _id: "mock-2",
    title: "Acoustic Sessions: Live in Sylhet",
    shortDescription:
      "An intimate evening of unplugged performances from local singer-songwriters.",
    fullDescription:
      "A cozy, candlelit evening featuring four local singer-songwriters performing stripped-back acoustic sets. Seating is limited to keep the atmosphere intimate, with a short break between sets to grab drinks and chat with the performers.",
    category: "Music",
    price: 8,
    date: "2026-11-03",
    location: "Sylhet, Bangladesh",
    capacity: 80,
    organizerName: "Sylhet Sound Collective",
    images: [
      "https://picsum.photos/seed/venuo-music/900/600",
      "https://picsum.photos/seed/venuo-music-2/900/600",
    ],
    reviews: [
      {
        id: "r3",
        author: "Farzana A.",
        rating: 5,
        comment: "Such a warm, intimate night. The venue suited the music perfectly.",
      },
    ],
  },
  {
    _id: "mock-3",
    title: "UX & Product Design Sprint",
    shortDescription:
      "A hands-on weekend workshop covering research, prototyping, and usability testing.",
    fullDescription:
      "A two-day intensive where you'll work in small teams to take a product idea from research through to a tested prototype. Led by senior product designers, the sprint covers user interviews, rapid prototyping, and running your own usability tests — all skills you'll walk away able to apply immediately.",
    category: "Business",
    price: 25,
    date: "2026-09-20",
    location: "Chattogram, Bangladesh",
    capacity: 40,
    organizerName: "Design Sprint BD",
    images: [
      "https://picsum.photos/seed/venuo-design/900/600",
      "https://picsum.photos/seed/venuo-design-2/900/600",
    ],
  },
  {
    _id: "mock-4",
    title: "Founders Coffee Meetup",
    shortDescription:
      "A casual monthly gathering for early-stage founders to swap notes and find collaborators.",
    fullDescription:
      "No pitches, no panels — just founders talking honestly about what's working and what isn't. Held on the last Sunday of every month, this is a low-key space to meet people building in the same trenches as you and swap practical advice over coffee.",
    category: "Business",
    price: 0,
    date: "2026-08-30",
    location: "Dhaka, Bangladesh",
    capacity: 60,
    organizerName: "Founders Circle Dhaka",
    images: ["https://picsum.photos/seed/venuo-coffee/900/600"],
  },
  {
    _id: "mock-5",
    title: "Street Food Festival",
    shortDescription:
      "Sample dishes from 30+ local vendors and watch live cooking demonstrations.",
    fullDescription:
      "A weekend celebration of street food from across the country, with over 30 vendors serving everything from classic favorites to experimental fusion dishes. Live cooking demonstrations run throughout the day, alongside live music in the evening.",
    category: "Food & Drink",
    price: 5,
    date: "2026-10-05",
    location: "Dhaka, Bangladesh",
    capacity: 1000,
    organizerName: "Dhaka Food Collective",
    images: [
      "https://picsum.photos/seed/venuo-food/900/600",
      "https://picsum.photos/seed/venuo-food-2/900/600",
    ],
    reviews: [
      {
        id: "r4",
        author: "Rakib H.",
        rating: 5,
        comment: "Incredible variety and the demonstrations were a great touch.",
      },
    ],
  },
  {
    _id: "mock-6",
    title: "Sunrise Yoga & Meditation",
    shortDescription:
      "Start your morning with guided breathwork and a gentle flow by the lake.",
    fullDescription:
      "An early-morning session designed to ease you into the day — starting with guided breathwork, moving into a gentle vinyasa flow, and closing with a short meditation as the sun comes up over the water. Suitable for all levels; mats provided.",
    category: "Wellness",
    price: 10,
    date: "2026-09-14",
    location: "Cox's Bazar, Bangladesh",
    capacity: 30,
    organizerName: "Coastal Wellness Retreats",
    images: ["https://picsum.photos/seed/venuo-yoga/900/600"],
  },
  {
    _id: "mock-7",
    title: "Contemporary Art Exhibition",
    shortDescription:
      "A curated showcase of emerging South Asian painters and mixed-media artists.",
    fullDescription:
      "This exhibition brings together twelve emerging artists working across painting, sculpture, and mixed media, all exploring themes of identity and place in modern South Asia. The opening night includes a guided walkthrough with the curator.",
    category: "Art & Culture",
    price: 12,
    date: "2026-11-18",
    location: "Dhaka, Bangladesh",
    capacity: 200,
    organizerName: "Dhaka Contemporary Gallery",
    images: [
      "https://picsum.photos/seed/venuo-art/900/600",
      "https://picsum.photos/seed/venuo-art-2/900/600",
    ],
  },
  {
    _id: "mock-8",
    title: "Indie Rock Night",
    shortDescription:
      "Four up-and-coming bands share the stage for one loud, unforgettable night.",
    fullDescription:
      "Four of the region's most exciting up-and-coming rock bands take the stage for one high-energy night. Doors open early for a chance to grab merch and meet the bands before the first set kicks off.",
    category: "Music",
    price: 12,
    date: "2026-12-02",
    location: "Chattogram, Bangladesh",
    capacity: 300,
    organizerName: "Chattogram Live Music",
    images: ["https://picsum.photos/seed/venuo-rock/900/600"],
  },
  {
    _id: "mock-9",
    title: "Startup Pitch Night",
    shortDescription:
      "Watch six early-stage startups pitch to a panel of investors and mentors.",
    fullDescription:
      "Six early-stage startups get eight minutes each to pitch to a panel of investors and experienced mentors, followed by live Q&A. Open to the public — a great night for anyone curious about what's being built locally right now.",
    category: "Business",
    price: 0,
    date: "2026-09-28",
    location: "Sylhet, Bangladesh",
    capacity: 150,
    organizerName: "Sylhet Startup Hub",
    images: ["https://picsum.photos/seed/venuo-pitch/900/600"],
  },
  {
    _id: "mock-10",
    title: "Cloud & DevOps Workshop",
    shortDescription:
      "A practical session on containers, CI/CD pipelines, and cloud deployment basics.",
    fullDescription:
      "A hands-on, laptop-required workshop covering the fundamentals of containerization, building CI/CD pipelines, and deploying to the cloud. By the end, you'll have deployed a working app end-to-end using the same tools covered in the session.",
    category: "Technology",
    price: 20,
    date: "2026-10-25",
    location: "Dhaka, Bangladesh",
    capacity: 60,
    organizerName: "Dhaka DevOps Guild",
    images: [
      "https://picsum.photos/seed/venuo-cloud/900/600",
      "https://picsum.photos/seed/venuo-cloud-2/900/600",
    ],
  },
];