import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const devLog = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(...args);
    }
  },
};

export const getImageUrl = (
  imageUrl: string | null,
  size = "original"
): string => {
  const baseImageUrl =
    size === "original"
      ? `https://image.tmdb.org/t/p/original`
      : `https://image.tmdb.org/t/p/w${size}`;

  return `${baseImageUrl}${imageUrl}`;
};
