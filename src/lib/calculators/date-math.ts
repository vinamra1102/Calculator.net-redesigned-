/**
 * Date-math kernel.
 * Shared by: Age, Date difference, Time Duration, Day Counter, Day of Week, etc.
 * Uses date-fns to avoid hand-rolled date arithmetic bugs.
 */

import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  subYears,
  subMonths,
  subDays,
  format,
  getDay,
  isLeapYear,
  isValid,
  parseISO,
  startOfDay,
} from "date-fns";

export interface DateDiffResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: string;
  dayOfWeek: string;
  isLeapYearBirth: boolean;
}

/** Full date difference breakdown */
export function dateDiff(from: Date, to: Date): DateDiffResult {
  const start = startOfDay(from);
  const end = startOfDay(to);

  return {
    years: differenceInYears(end, start),
    months: differenceInMonths(end, start),
    weeks: differenceInWeeks(end, start),
    days: differenceInDays(end, start),
    hours: differenceInHours(to, from),
    minutes: differenceInMinutes(to, from),
    seconds: differenceInSeconds(to, from),
    totalDays: differenceInDays(end, start),
    totalHours: differenceInHours(to, from),
    totalMinutes: differenceInMinutes(to, from),
    totalSeconds: differenceInSeconds(to, from),
  };
}

/** Age calculation with all the details */
export function calculateAge(birth: Date, asOf: Date): AgeResult {
  const years = differenceInYears(asOf, birth);
  const afterYears = subYears(asOf, years);
  const months = differenceInMonths(afterYears, birth);
  const afterMonths = subMonths(afterYears, months);
  const days = differenceInDays(afterMonths, birth);

  const totalDays = differenceInDays(asOf, birth);
  const totalWeeks = differenceInWeeks(asOf, birth);
  const totalMonths = differenceInMonths(asOf, birth);

  // Next birthday
  let nextBirthday = addYears(birth, years + 1);
  if (nextBirthday <= asOf) {
    nextBirthday = addYears(birth, years + 2);
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthday: format(nextBirthday, "MMMM d, yyyy"),
    dayOfWeek: dayNames[getDay(birth)],
    isLeapYearBirth: isLeapYear(birth),
  };
}

/** Day of week for a given date */
export function dayOfWeek(date: Date): string {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[getDay(date)];
}

/** Days between two dates (absolute) */
export function daysBetween(from: Date, to: Date): number {
  return Math.abs(differenceInDays(startOfDay(to), startOfDay(from)));
}

/** Add business days to a date (skip weekends) */
export function addBusinessDays(startDate: Date, days: number): Date {
  let date = new Date(startDate);
  let remaining = Math.abs(days);
  const direction = days >= 0 ? 1 : -1;

  while (remaining > 0) {
    date = addDays(date, direction);
    const dow = getDay(date);
    if (dow !== 0 && dow !== 6) {
      remaining--;
    }
  }
  return date;
}

/** Parse a date string safely */
export function safeParseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parsed = parseISO(dateStr);
  return isValid(parsed) ? parsed : null;
}

/** Format a duration in seconds to human-readable */
export function formatDuration(totalSeconds: number): string {
  const abs = Math.abs(totalSeconds);
  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const secs = abs % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? "s" : ""}`);

  return parts.join(", ");
}
