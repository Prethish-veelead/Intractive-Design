import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProducts, isCategory } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/shop/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  if (!hasLocale(lang) || !isCategory(category)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.categories[category] };
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/shop/[category]">) {
  const { lang, category } = await params;
  if (!hasLocale(lang) || !isCategory(category)) notFound();
  const [dict, products] = await Promise.all([getDictionary(lang), getProducts(category)]);

  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <header data-reveal className="mb-10 md:mb-14">
        <Eyebrow>{products.length} {dict.category.products}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{dict.categories[category]}</h1>
      </header>
      <ProductFilters
        labels={dict.filters}
        items={products.map((p) => ({
          slug: p.slug,
          price: p.price,
          rating: p.rating,
          finish: p.finish,
          features: p.features,
          families: [...new Set(p.shades.map((s) => s.family))],
        }))}
        cards={Object.fromEntries(products.map((p) => [p.slug, <ProductCard key={p.slug} product={p} lang={lang} dict={dict} />]))}
      />
    </Container>
  );
}
