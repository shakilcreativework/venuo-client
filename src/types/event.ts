export interface EventSummary {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  price: number;
  currency?: string;
  date: string;
  location: string;
  images: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
}

export interface EventDetail extends EventSummary {
  fullDescription: string;
  capacity: number;
  organizerName?: string;
  reviews?: Review[];
}