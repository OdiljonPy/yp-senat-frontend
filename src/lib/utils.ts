import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const stripHtml = (html?: string): string => {
  if (!html) return ""; // If html is undefined or empty, return an empty string

  // Remove HTML tags
  const strippedHtml = html.replace(/<[^>]*>/g, "");

  // Decode HTML entities
  const decodedHtml = strippedHtml.replace(/&[^;]+;/g, (entity) => {
    const entities: { [key: string]: string } = {
      "&nbsp;": " ",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    return entities[entity] || entity;
  });

  return decodedHtml.trim();
};

export function formatDate(dateString:string) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getFullYear()}`;
}
