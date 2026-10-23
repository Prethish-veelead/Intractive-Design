import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProductArt } from "@/components/ui/ProductArt";
import { PinnedParallax } from "@/components/motion/PinnedParallax";
import { LeafShadow } from "@/components/ui/LeafShadow";
import { findImage } from "@/lib/images";

// Floating shade dots drifting in front of the image (depth = parallax speed).
const floaters = [
  { hex: "#c46a73", size: "h-16 w-16", pos: "-right-4 top-10", depth: 3 },
  { hex: "#eda7ad", size: "h-10 w-10", pos: "-left-3 top-1/2", depth: 2 },
  { hex: "#c9a66b", size: "h-7 w-7", pos: "bottom-12 right-10", depth: 4 },
];

export function BrandStory({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  const storyPhoto = findImage("lifestyle/brand-story");
  return (
    <PinnedParallax className="relative flex items-center overflow-hidden bg-ivory py-16 md:min-h-[100dvh] md:py-24">
      <LeafShadow className="-inset-[6%]" />
      <Container className="relative grid items-center gap-14 md:grid-cols-12">
        <div data-reveal className="relative md:col-span-5">
          <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2.5rem-0.5rem)] md:aspect-[3/4] bg-gradient-to-b from-[#f3e6dc] to-[#e3c4a6]">
              {storyPhoto ? (
                // Taller than its frame so the parallax drift never shows an edge.
                <div data-depth="1" className="absolute inset-x-0 -inset-y-[10%]">
                  <Image src={storyPhoto} alt="" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
                </div>
              ) : (
                <div data-depth="1" className="absolute inset-0">
                  <ProductArt kind="powder" color="#f3e6dc" className="absolute inset-x-0 bottom-6 mx-auto h-3/4 w-auto" />
                </div>
              )}
            </div>
          </div>
          {floaters.map((f) => (
            <span
              key={f.hex}
              data-depth={f.depth}
              aria-hidden
              className={`absolute hidden rounded-full shadow-lift md:block ${f.size} ${f.pos}`}
              style={{ background: `radial-gradient(circle at 35% 30%, #ffffff80, ${f.hex} 60%)` }}
            />
          ))}
        </div>
        <div data-reveal className="md:col-span-6 md:col-start-7">
          <Eyebrow>{t.storyEyebrow}</Eyebrow>
          <blockquote className="mt-6 font-display text-3xl italic leading-snug text-rosewood md:text-[2.75rem]">
            “{t.storyQuote}”
          </blockquote>
          <p className="mt-8 max-w-md text-ink/70">{t.storyText}</p>
          <div className="mt-10">
            <ButtonLink href={`/${lang}/about`} variant="secondary">{t.storyCta}</ButtonLink>
          </div>
        </div>
      </Container>
    </PinnedParallax>
  );
}
