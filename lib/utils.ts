import { clsx, type ClassValue } from "clsx";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";
import { format as timeagoFormat, register } from "timeago.js";

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

export const formatDateTime = (iso: string | null) => {
  if (!iso) {
    devLog.error("No iso provided for formatDateTime.");
    return null;
  }

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

export const timeago = (date: string) => {
  return timeagoFormat(date);
};

register("short", (number: number, index: number): [string, string] => {
  const units: [string, string][] = [
    ["just now", "just now"], // 0
    ["%s sec ago", "in %s sec"], // 1
    ["1 min ago", "in 1 min"], // 2
    ["%s mins ago", "in %s mins"], // 3
    ["1 hr ago", "in 1 hr"], // 4
    ["%s hrs ago", "in %s hrs"], // 5
    ["1 day ago", "in 1 day"], // 6
    ["%s days ago", "in %s days"], // 7
    ["1 week ago", "in 1 week"], // 8
    ["%s weeks ago", "in %s weeks"], // 9
    ["1 month ago", "in 1 month"], // 10
    ["%s months ago", "in %s months"], // 11
    ["1 year ago", "in 1 year"], // 12
    ["%s years ago", "in %s years"], // 13
  ];
  return units[index];
});

export const shortTimeago = (date: string) => timeagoFormat(date, "short");
