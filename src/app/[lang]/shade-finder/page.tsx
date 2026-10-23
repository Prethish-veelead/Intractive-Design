import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ShadeQuiz } from "@/components/shade-finder/ShadeQuiz";

const recommendable = ["skin-silk-cushion", "velvet-kiss-matte-lipstick", "satin-bloom-lipstick", "dewy-glow-lip-tint", "petal-blush"];

export async function generateMetadata({ params }: PageProps<"/[lang]/shade-finder">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).shadeFinder;
  return { title: t.eyebrow, description: t.intro };
}

export default async function ShadeFinderPage({ params }: PageProps<"/[lang]/shade-finder">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, all] = await Promise.all([getDictionary(lang), getProducts()]);
  const t = dict.shadeFinder;
  // Only what the quiz needs goes to the browser.
  const products = all.filter((p) => recommendable.includes(p.slug)).map(({ slug, name, kind, shades }) => ({ slug, name, kind, shades }));

  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <header data-reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{t.title}</h1>
        <p className="mt-6 text-lg text-ink/70">{t.intro}</p>
      </header>
      <div data-reveal className="mx-auto mt-14 max-w-4xl">
        <ShadeQuiz lang={lang} labels={t} products={products} />
      </div>
    </Container>
  );
}
