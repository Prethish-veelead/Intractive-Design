import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProductArt } from "@/components/ui/ProductArt";

export function BrandStory({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="py-16 md:py-40">
      <Container className="grid items-center gap-14 md:grid-cols-12">
        <div className="relative md:col-span-5">
          <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[3/4] rounded-[calc(2.5rem-0.5rem)] bg-gradient-to-b from-[#f3e6dc] to-[#e3c4a6]">
              <ProductArt kind="powder" color="#f3e6dc" className="absolute inset-x-0 bottom-6 mx-auto h-3/4 w-auto" />
            </div>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
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
    </section>
  );
}
