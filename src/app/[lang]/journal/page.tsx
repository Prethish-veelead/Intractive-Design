import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/journal";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";
import { JournalCard } from "@/components/sections/JournalCard";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export async function generateMetadata({ params }: PageProps<"/[lang]/journal">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).journal;
  return { title: t.eyebrow, description: t.intro };
}

export default async function JournalPage({ params }: PageProps<"/[lang]/journal">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.journal;

  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <SmoothScroll />
      <header data-reveal className="max-w-2xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{t.title}</h1>
        <p className="mt-6 text-lg text-ink/70">{t.intro}</p>
      </header>
      <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
        {articles.map((a) => (
          <li key={a.slug} data-reveal><JournalCard article={a} lang={lang} dict={dict} /></li>
        ))}
      </ul>
    </Container>
  );
}
