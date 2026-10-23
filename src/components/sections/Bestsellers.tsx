import { getBestsellers } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container, SectionHeading } from "@/components/ui/Section";
import { DragCarousel } from "@/components/motion/DragCarousel";

export async function Bestsellers({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const products = await getBestsellers();
  return (
    <section className="py-16 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.home.bestsellersEyebrow}
          title={dict.home.bestsellersTitle}
          action={<ButtonLink href={`/${lang}/shop/lips`} variant="secondary">{dict.home.viewAll}</ButtonLink>}
        />
        <DragCarousel prevLabel={dict.home.prev} nextLabel={dict.home.next}>
          {products.map((p) => (
            <li key={p.slug} data-reveal className="w-[72%] shrink-0 sm:w-[44%] md:w-[calc((100%-4.5rem)/4)]">
              <ProductCard product={p} lang={lang} dict={dict} />
            </li>
          ))}
        </DragCarousel>
      </Container>
    </section>
  );
}
