import { clsx, type ClassValue } from "clsx";
import { parseISO, format, formatDistanceToNow } from "date-fns";
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

export const formatNumber = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDateTime = (iso: string) => {
  const formatted = format(
    parseISO("2025-07-02T23:42:54.848253Z"),
    "do MMMM, yyyy"
  );
  return formatted;
};

export const formatDate = (iso: string, yearOnly = false) => {
  if (!iso) return "";
  const date = parseISO(iso);
  return yearOnly ? format(date, "yyyy") : format(date, "do MMMM, yyyy");
};

export const timeago = (iso: string) => {
  const raw = formatDistanceToNow(new Date(iso), { addSuffix: true });
  const timeAgo = raw.replace(/^about /, "");
  return timeAgo;
};
