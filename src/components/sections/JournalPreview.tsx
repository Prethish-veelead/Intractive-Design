import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Container, SectionHeading } from "@/components/ui/Section";

// Image placeholders until the journal photos exist (task-plan 3.9).
const tones = ["from-[#cfe3ea] to-[#e9c9c3]", "from-[#f1d3cf] to-[#c97b84]", "from-[#efe2d6] to-[#c9a66b]"];

export function JournalPreview({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="py-16 md:py-32">
      <Container>
        <SectionHeading eyebrow={t.journalEyebrow} title={t.journalTitle} />
        <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
          {t.journal.map((article, i) => (
            <li key={article.title} data-reveal>
              <Link href={`/${lang}/journal`} className="group block">
                <div className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5">
                  <div className={`aspect-[4/3] rounded-card-inner bg-gradient-to-br transition-transform duration-700 ease-silk group-hover:scale-[0.98] ${tones[i % tones.length]}`} />
                </div>
                <p className="eyebrow mt-5 text-[10px] text-rose">{article.tag}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-rosewood">{article.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
