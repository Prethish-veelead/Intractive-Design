import { Star, StarHalf } from "@phosphor-icons/react/ssr";

/** Read-only star rating, rounded to the nearest half star. */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const halves = Math.round(rating * 2);
  return (
    <span className="flex gap-0.5 text-champagne" role="img" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = halves - i * 2;
        if (filled >= 2) return <Star key={i} size={size} weight="fill" />;
        if (filled === 1) return <StarHalf key={i} size={size} weight="fill" />;
        return <Star key={i} size={size} weight="light" />;
      })}
    </span>
  );
}
