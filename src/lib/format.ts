type Locale = "th" | "en";

/** ฿590, ฿1,290 — symbol first, no decimals unless needed. */
export function formatPrice(amount: number, locale: Locale): string {
  const number = new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-GB", {
    maximumFractionDigits: 2,
  }).format(amount);
  return `฿${number}`;
}

/** Thai uses the Buddhist Era year (2569), English the Gregorian year (2026). */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
