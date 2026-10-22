import { Star } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/lib/i18n";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Reviews({ dict }: { dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="bg-blush/40 py-16 md:py-32">
      <Container>
        <SectionHeading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} />
        <ul className="grid gap-5 md:grid-cols-3">
          {t.reviews.map((r) => (
            <li key={r.name} className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5">
              <figure className="flex h-full flex-col justify-between gap-8 rounded-card-inner bg-ivory p-7">
                <div>
                  <div className="flex gap-0.5 text-champagne" aria-label="5/5">
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} weight="fill" />)}
                  </div>
                  <blockquote className="mt-5 font-display text-xl leading-relaxed text-ink">“{r.quote}”</blockquote>
                </div>
                <figcaption className="text-sm text-ink/60">
                  <span className="text-ink">{r.name}</span> · {r.city}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
