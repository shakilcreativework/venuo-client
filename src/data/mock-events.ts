import { EventSummary } from "@/types/event";

export const mockEvents: EventSummary[] = [
  {
    _id: "mock-1",
    title: "Dhaka Tech Summit 2026",
    shortDescription:
      "A full day of talks on AI, product, and the future of software in South Asia.",
    category: "Technology",
    price: 15,
    date: "2026-10-12",
    location: "Dhaka, Bangladesh",
    images: ["https://picsum.photos/seed/venuo-tech/800/600"],
  },
  {
    _id: "mock-2",
    title: "Acoustic Sessions: Live in Sylhet",
    shortDescription:
      "An intimate evening of unplugged performances from local singer-songwriters.",
    category: "Music",
    price: 8,
    date: "2026-11-03",
    location: "Sylhet, Bangladesh",
    images: ["https://picsum.photos/seed/venuo-music/800/600"],
  },
  {
    _id: "mock-3",
    title: "UX & Product Design Sprint",
    shortDescription:
      "A hands-on weekend workshop covering research, prototyping, and usability testing.",
    category: "Business",
    price: 25,
    date: "2026-09-20",
    location: "Chattogram, Bangladesh",
    images: ["https://picsum.photos/seed/venuo-design/800/600"],
  },
  {
    _id: "mock-4",
    title: "Founders Coffee Meetup",
    shortDescription:
      "A casual monthly gathering for early-stage founders to swap notes and find collaborators.",
    category: "Business",
    price: 0,
    date: "2026-08-30",
    location: "Dhaka, Bangladesh",
    images: ["https://picsum.photos/seed/venuo-coffee/800/600"],
  },
];