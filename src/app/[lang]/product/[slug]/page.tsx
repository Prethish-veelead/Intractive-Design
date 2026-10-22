import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Truck } from "@phosphor-icons/react/ssr";
import { getProduct, getProducts } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Price } from "@/components/ui/Price";
import { ShadeSelector } from "@/components/product/ShadeSelector";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/product/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = await getProduct(slug);
  if (!hasLocale(lang) || !product) return {};
  return { title: product.name, description: product.tagline[lang] };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/product/[slug]">) {
  const { lang, slug } = await params;
  const product = await getProduct(slug);
  if (!hasLocale(lang) || !product) notFound();
  const dict = await getDictionary(lang);
  const t = dict.product;

  return (
    <Container className="pb-24 pt-10 md:pt-16">
      <nav className="mb-8 text-xs text-ink/50">
        <Link href={`/${lang}/shop/${product.category}`} className="hover:text-rosewood">{dict.categories[product.category]}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <ShadeSelector
        product={product}
        labels={{ shade: t.shade, addToBag: t.addToBag, badge: product.badge ? dict.badges[product.badge] : undefined }}
      >
        {/* Server-rendered details passed into the client selector's right column. */}
        <h1 className="font-display text-4xl leading-tight text-rosewood md:text-5xl">{product.name}</h1>
        <p className="mt-3 text-ink/70">{product.tagline[lang]}</p>
        <Price amount={product.price} lang={lang} className="mt-5 block text-2xl text-ink" />
        <ul className="mt-6 flex flex-wrap gap-2">
          {product.claims.map((c) => (
            <li key={c.en} className="flex items-center gap-1.5 rounded-full bg-blush/60 px-3 py-1.5 text-xs text-rosewood">
              <Check size={12} weight="bold" /> {c[lang]}
            </li>
          ))}
        </ul>
      </ShadeSelector>

      <div className="mt-10 grid gap-3 md:ml-auto md:w-1/2 md:pl-8">
        <p className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink/80 ring-1 ring-rosewood/5">
          <Truck size={20} weight="light" className="text-rosewood" />
          <span>{t.delivery} · {t.freeShipping}</span>
        </p>
        <a href={site.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl px-4 py-3 text-sm text-[#05893b] ring-1 ring-line/30 hover:bg-line/5">
          {t.chatLine}
        </a>
        <p className="px-1 text-xs text-ink/50">
          <Eyebrow>{t.fda}</Eyebrow> <span className="ml-2">{product.fdaNumber ?? t.fdaPending}</span>
        </p>
      </div>
    </Container>
  );
}
