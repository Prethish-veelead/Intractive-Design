import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gift } from "@phosphor-icons/react/ssr";
import { getBestsellers, getProducts } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";

const GIFT_BUDGET = 500;

export async function generateMetadata({ params }: PageProps<"/[lang]/gifts">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).gifts;
  return { title: t.eyebrow, description: t.intro };
}

export default async function GiftsPage({ params }: PageProps<"/[lang]/gifts">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, sets, bestsellers] = await Promise.all([getDictionary(lang), getProducts("sets"), getBestsellers()]);
  const t = dict.gifts;
  const underBudget = bestsellers.filter((p) => p.price <= GIFT_BUDGET && p.category !== "sets").slice(0, 4);

  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <header data-reveal className="max-w-2xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{t.title}</h1>
        <p className="mt-6 text-lg text-ink/70">{t.intro}</p>
      </header>

      <section className="mt-16">
        <SectionHeading eyebrow={t.eyebrow} title={t.sets} />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {sets.map((p) => <li key={p.slug} data-reveal><ProductCard product={p} lang={lang} dict={dict} /></li>)}
        </ul>
      </section>

      <div data-reveal className="mt-20 flex flex-col gap-4 rounded-[2.5rem] bg-rosewood px-6 py-10 text-ivory md:flex-row md:items-center md:gap-8 md:px-14">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-champagne">
          <Gift size={28} weight="light" />
        </span>
        <div>
          <h2 className="font-display text-3xl">{t.wrapTitle}</h2>
          <p className="mt-2 text-ivory/75">{t.wrapText}</p>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading eyebrow={t.eyebrow} title={t.under500} />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {underBudget.map((p) => <li key={p.slug} data-reveal><ProductCard product={p} lang={lang} dict={dict} /></li>)}
        </ul>
      </section>
    </Container>
  );
}
