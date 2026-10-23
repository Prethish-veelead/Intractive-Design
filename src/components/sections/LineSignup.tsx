import { ChatCircleDots } from "@phosphor-icons/react/ssr";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Section";

export function LineSignup({ dict }: { dict: Dictionary }) {
  const t = dict.home;
  return (
    <section className="py-16 md:py-32">
      <Container>
        <div data-reveal className="mx-auto max-w-3xl rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-gradient-to-br from-ivory to-blush/60 px-6 py-14 text-center md:px-16">
            <span className="eyebrow inline-block rounded-full bg-line/10 px-3 py-1 text-[10px] font-medium text-[#05893b]">{t.lineEyebrow}</span>
            <h2 className="mx-auto mt-5 max-w-lg font-display text-4xl text-rosewood md:text-5xl">{t.lineTitle}</h2>
            <p className="mx-auto mt-5 max-w-md text-ink/70">{t.lineText}</p>
            <a
              href={site.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-line px-7 text-sm font-medium text-white transition-transform duration-500 ease-press hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <ChatCircleDots size={20} weight="fill" />
              {t.lineCta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
