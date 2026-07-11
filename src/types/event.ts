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