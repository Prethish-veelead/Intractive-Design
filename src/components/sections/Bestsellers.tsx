import { getBestsellers } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container, SectionHeading } from "@/components/ui/Section";

export async function Bestsellers({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const products = (await getBestsellers()).slice(0, 4);
  return (
    <section className="py-16 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.home.bestsellersEyebrow}
          title={dict.home.bestsellersTitle}
          action={<ButtonLink href={`/${lang}/shop/lips`} variant="secondary">{dict.home.viewAll}</ButtonLink>}
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {products.map((p) => (
            <li key={p.slug}><ProductCard product={p} lang={lang} dict={dict} /></li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
