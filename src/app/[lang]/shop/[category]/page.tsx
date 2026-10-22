import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProducts, isCategory } from "@/lib/catalog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";

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
      <header className="mb-12 md:mb-16">
        <Eyebrow>{products.length} {dict.category.products}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{dict.categories[category]}</h1>
      </header>
      {/* Filters and sorting arrive in task-plan 3.5. */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}><ProductCard product={p} lang={lang} dict={dict} /></li>
        ))}
      </ul>
    </Container>
  );
}
