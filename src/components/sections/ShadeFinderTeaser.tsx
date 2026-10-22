import type { Dictionary, Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

const skinTones = ["#f1d6c3", "#e8c5a8", "#dbb08d", "#c99a72", "#b18060", "#8d5d43"];

export function ShadeFinderTeaser({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="rounded-[2.5rem] bg-rosewood/10 p-2">
          <div className="grid gap-10 overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-rosewood px-6 py-14 text-ivory md:grid-cols-2 md:px-14 md:py-20">
            <div>
              <span className="eyebrow inline-block rounded-full bg-ivory/10 px-3 py-1 text-[10px] font-medium text-champagne">{t.shadeEyebrow}</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl">{t.shadeTitle}</h2>
              <p className="mt-5 max-w-md text-ivory/75">{t.shadeText}</p>
              <div className="mt-9">
                <ButtonLink href={`/${lang}/shade-finder`} variant="secondary">{t.shadeCta}</ButtonLink>
              </div>
            </div>
            <ul className="grid grid-cols-3 content-center gap-4 md:gap-6" aria-hidden>
              {skinTones.map((hex, i) => (
                <li
                  key={hex}
                  className="aspect-square rounded-full ring-1 ring-ivory/20 ring-offset-4 ring-offset-rosewood"
                  style={{ background: `radial-gradient(circle at 35% 30%, #ffffff55, ${hex} 55%)`, opacity: 0.75 + i * 0.05 }}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
