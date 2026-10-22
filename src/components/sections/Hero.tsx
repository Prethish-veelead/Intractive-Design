import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { ProductArt } from "@/components/ui/ProductArt";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";

const heroShades = ["#c46a73", "#b5654a", "#7d2f45", "#c48d7d", "#b3262f", "#e08a8f"];

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-32 md:pt-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blush/70 blur-3xl" />
      <Container className="relative grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Eyebrow>{t.heroEyebrow}</Eyebrow>
          <h1 className="mt-6 whitespace-pre-line font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] text-rosewood">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-md text-base text-ink/70 md:text-lg">{t.heroText}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`/${lang}/shop/lips`}>{t.heroCta}</ButtonLink>
            <ButtonLink href={`/${lang}/shade-finder`} variant="secondary">{t.heroSecondary}</ButtonLink>
          </div>
        </div>

        <div className="relative md:col-span-6">
          <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft">
            <div className="relative aspect-square overflow-hidden rounded-[calc(2.5rem-0.5rem)] md:aspect-[4/5] bg-[radial-gradient(120%_90%_at_70%_20%,#f8e7e2_0%,#efcfc7_45%,#e4b5ab_100%)]">
              <ProductArt kind="lipstick" color="#c46a73" className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto" />
            </div>
          </div>
          {/* Floating shade chip overlapping the frame; flattened on mobile. */}
          <div className="mt-4 flex items-center gap-3 rounded-full bg-ivory/90 px-4 py-3 shadow-lift ring-1 ring-rosewood/10 md:absolute md:-left-10 md:bottom-12 md:mt-0">
            <span className="flex -space-x-1">
              {heroShades.map((hex) => <ShadeSwatch key={hex} hex={hex} size="sm" />)}
            </span>
            <span className="text-xs text-ink/70">Velvet Kiss · 6 {dict.product.shades}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
