import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for conditional and merged Tailwind classes
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(...inputs));
};