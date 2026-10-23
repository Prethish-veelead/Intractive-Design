import { articles } from "@/content/journal";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Container, SectionHeading } from "@/components/ui/Section";
import { JournalCard } from "./JournalCard";

export function JournalPreview({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="py-16 md:py-32">
      <Container>
        <SectionHeading eyebrow={t.journalEyebrow} title={t.journalTitle} />
        <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
          {articles.slice(0, 3).map((article) => (
            <li key={article.slug} data-reveal>
              <JournalCard article={article} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
