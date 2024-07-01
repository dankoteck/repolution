import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
) {
  return dayjs().to(dayjs(date));
}
