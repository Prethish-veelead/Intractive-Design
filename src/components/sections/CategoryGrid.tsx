import Image from "next/image";
import Link from "next/link";
import type { CategorySlug, ProductKind } from "@/lib/catalog";
import { findImage } from "@/lib/images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ProductArt } from "@/components/ui/ProductArt";

// Asymmetric bento: Lips is the hero tile; the rest fill around it. Single column on mobile.
const tiles: { slug: CategorySlug; kind: ProductKind; color: string; span: string; bg: string }[] = [
  { slug: "lips", kind: "lipstick", color: "#b3262f", span: "md:col-span-6 md:row-span-2", bg: "from-[#f6dcd8] to-[#e9b9b3]" },
  { slug: "face", kind: "blush", color: "#eda7ad", span: "md:col-span-3", bg: "from-[#f8ece6] to-[#efd6cb]" },
  { slug: "eyes", kind: "palette", color: "#c48a62", span: "md:col-span-3", bg: "from-[#f3e5d8] to-[#e6cbb2]" },
  { slug: "lashes", kind: "lashes", color: "#2b1e22", span: "md:col-span-3", bg: "from-[#f7efec] to-[#eadbd6]" },
  { slug: "sets", kind: "set", color: "#c97b84", span: "md:col-span-3", bg: "from-[#f5e3e0] to-[#e7c6c3]" },
];

export function CategoryGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="py-16 md:py-32">
      <Container>
        <SectionHeading eyebrow={dict.home.categoriesEyebrow} title={dict.home.categoriesTitle} />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          {tiles.map((t) => ({ ...t, photo: findImage(`categories/${t.slug}`) })).map((tile) => (
            <li key={tile.slug} data-reveal className={`${tile.slug === "lips" ? "col-span-2" : ""} ${tile.span}`}>
              <Link href={`/${lang}/shop/${tile.slug}`} className="group block h-full rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5">
                <div className={`relative flex h-full min-h-48 flex-col justify-end overflow-hidden rounded-card-inner bg-gradient-to-br p-5 md:min-h-56 ${tile.bg}`}>
                  {tile.photo ? (
                    <>
                      <Image
                        src={tile.photo}
                        alt=""
                        fill
                        sizes={tile.slug === "lips" ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 25vw, 46vw"}
                        className="object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
                      />
                      {/* Soft fade at the bottom keeps the label readable on any photo. */}
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory via-ivory/70 to-transparent" />
                    </>
                  ) : (
                    <ProductArt
                      kind={tile.kind}
                      color={tile.color}
                      className="absolute -right-4 top-2 h-[58%] w-auto md:h-[78%] transition-transform duration-700 ease-silk group-hover:-translate-y-1 group-hover:scale-105"
                    />
                  )}
                  <span className="relative z-10 font-display text-xl text-rosewood md:text-3xl">{dict.categories[tile.slug]}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
