import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretDown, Check, Truck } from "@phosphor-icons/react/ssr";
import { getCompleteTheLook, getProduct, getProducts, ingredientsByKind } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Price } from "@/components/ui/Price";
import { ProductCard } from "@/components/ui/ProductCard";
import { Stars } from "@/components/ui/Stars";
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
  const [dict, completeTheLook] = await Promise.all([getDictionary(lang), getCompleteTheLook(product)]);
  const t = dict.product;

  return (
    <>
      <Container className="pb-16 pt-10 md:pt-16">
        <nav className="mb-8 text-xs text-ink/50">
          <Link href={`/${lang}/shop/${product.category}`} className="hover:text-rosewood">{dict.categories[product.category]}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">{product.name}</span>
        </nav>

        <ShadeSelector
          product={product}
          labels={{
            shade: t.shade,
            addToBag: t.addToBag,
            added: t.added,
            badge: product.badge ? dict.badges[product.badge] : undefined,
            compareTitle: t.compareTitle,
            compareHint: t.compareHint,
            skinFair: t.skinFair,
            skinDeep: t.skinDeep,
            galleryLabel: t.galleryLabel,
            viewProduct: t.viewProduct,
            viewSwatch: t.viewSwatch,
            viewTexture: t.viewTexture,
          }}
        >
          {/* Server-rendered details passed into the client selector's right column. */}
          <h1 className="font-display text-4xl leading-tight text-rosewood md:text-5xl">{product.name}</h1>
          <a href="#reviews" className="mt-3 flex items-center gap-2 text-sm text-ink/60 hover:text-rosewood">
            <Stars rating={product.rating} /> {product.rating} · {product.reviewCount} {t.reviewsCount}
          </a>
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
            <Truck size={20} weight="light" className="shrink-0 text-rosewood" />
            <span>{t.delivery} · {t.freeShipping}</span>
          </p>
          <a href={site.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl px-4 py-3 text-sm text-[#05893b] ring-1 ring-line/30 hover:bg-line/5">
            {t.chatLine}
          </a>

          <div className="mt-6 divide-y divide-rosewood/10 border-y border-rosewood/10">
            <Disclosure title={t.details} open>
              <p>{product.description[lang]}</p>
            </Disclosure>
            <Disclosure title={t.howTo}>
              <ol className="list-decimal space-y-1.5 pl-5">
                {product.howTo.map((step) => <li key={step.en}>{step[lang]}</li>)}
              </ol>
            </Disclosure>
            <Disclosure title={t.ingredients}>
              <p className="text-ink/70">{ingredientsByKind[product.kind]}</p>
              <p className="mt-3 text-xs text-ink/50">{t.ingredientsSample}</p>
              <p className="mt-3 text-xs text-ink/60">{t.fda}: {product.fdaNumber ?? t.fdaPending}</p>
            </Disclosure>
          </div>
        </div>
      </Container>

      <section id="reviews" className="scroll-mt-24 bg-blush/40 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow={t.reviews} title={`${product.rating} / 5`} action={<span className="flex items-center gap-2 text-sm text-ink/60"><Stars rating={product.rating} size={18} /> {product.reviewCount} {t.reviewsCount}</span>} />
          <ul className="grid gap-5 md:grid-cols-2">
            {product.reviews.map((r) => (
              <li key={r.name} data-reveal className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5">
                <figure className="h-full rounded-card-inner bg-ivory p-7">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 font-display text-xl leading-relaxed text-ink">“{r.text[lang]}”</blockquote>
                  <figcaption className="mt-5 text-sm text-ink/60"><span className="text-ink">{r.name}</span> · {r.city}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink/50">{dict.home.reviewsSample}</p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow={dict.home.bestsellersEyebrow} title={t.completeLook} />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {completeTheLook.map((p) => (
              <li key={p.slug} data-reveal><ProductCard product={p} lang={lang} dict={dict} /></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function Disclosure({ title, open = false, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-4">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <CaretDown size={16} weight="light" className="transition-transform duration-300 ease-silk group-open:rotate-180" />
      </summary>
      <div className="pb-2 pt-2 text-sm leading-relaxed text-ink/80">{children}</div>
    </details>
  );
}
