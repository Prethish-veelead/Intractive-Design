import { formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

export function Price({ amount, lang, className = "" }: { amount: number; lang: Locale; className?: string }) {
  return <span className={`tabular-nums ${className}`}>{formatPrice(amount, lang)}</span>;
}
