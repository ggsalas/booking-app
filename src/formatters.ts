import { DateFormatter } from "@internationalized/date";
import { BookedPeriod } from "./types";

export function formatCurrency(
  amount?: number,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  if (!amount) return "";

  return new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  if (!date) return "";

  const formatter = new DateFormatter("en-US", options);

  return formatter.format(new Date(date));
}
