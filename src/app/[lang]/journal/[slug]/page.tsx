import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { articles, getArticle } from "@/content/journal";
import { getProduct, type Product } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JournalCover } from "@/components/sections/JournalCard";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/journal/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!hasLocale(lang) || !article) return {};
  return { title: article.title[lang], description: article.excerpt[lang] };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/journal/[slug]">) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!hasLocale(lang) || !article) notFound();
  const dict = await getDictionary(lang);
  const products = (await Promise.all(article.products.map(getProduct))).filter((p): p is Product => !!p);

  return (
    <>
      <SmoothScroll />
      <article>
        <Container className="pt-10 md:pt-16">
          <Link href={`/${lang}/journal`} className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-rosewood">
            <ArrowLeft size={16} weight="light" /> {dict.journal.back}
          </Link>
          <header data-reveal className="mx-auto mt-10 max-w-3xl text-center">
            <Eyebrow>{article.tag[lang]} · {article.minutes} {dict.journal.minutes}</Eyebrow>
            <h1 className="mt-5 font-display text-5xl text-rosewood md:text-6xl">{article.title[lang]}</h1>
            <p className="mt-6 text-lg text-ink/70">{article.excerpt[lang]}</p>
          </header>
          <div data-reveal className="mt-12 rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(2.5rem-0.5rem)] md:aspect-[21/9]">
              <JournalCover article={article} sizes="(min-width: 1152px) 1152px, 92vw" priority />
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-2xl space-y-12 pb-8">
            {article.sections.map((s) => (
              <section key={s.heading.en} data-reveal>
                <h2 className="font-display text-3xl text-rosewood">{s.heading[lang]}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/80">
                  {s.paragraphs.map((p) => <p key={p.en}>{p[lang]}</p>)}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </article>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow={dict.journal.eyebrow} title={dict.journal.shopTheLook} />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.map((p) => (
              <li key={p.slug} data-reveal><ProductCard product={p} lang={lang} dict={dict} /></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
