import { CaretDown, Info } from "@phosphor-icons/react/ssr";
import type { ContentPage } from "@/content/pages";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";

/** Editorial long-form page: About, Help, legal. */
export function ContentPageView({ page, lang, dict }: { page: ContentPage; lang: Locale; dict: Dictionary }) {
  const toc = page.sections.filter((s) => s.id);
  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <header data-reveal className="max-w-3xl">
        <Eyebrow>{page.eyebrow[lang]}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{page.title[lang]}</h1>
        <p className="mt-6 text-lg text-ink/70">{page.intro[lang]}</p>
        {page.draft && (
          <p role="note" className="mt-6 flex items-start gap-2 rounded-2xl bg-champagne/15 px-4 py-3 text-sm text-ink/80">
            <Info size={18} weight="light" className="mt-0.5 shrink-0 text-rosewood" />
            {page.draft === "legal" ? dict.pages.draftLegal : dict.pages.draftOwner}
          </p>
        )}
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        {toc.length > 0 && (
          <nav aria-label={dict.pages.onThisPage} className="md:col-span-3">
            <p className="eyebrow text-[10px] text-ink/50">{dict.pages.onThisPage}</p>
            <ul className="mt-4 space-y-2 text-sm md:sticky md:top-28">
              {toc.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="text-ink/70 hover:text-rosewood">{s.heading[lang]}</a></li>
              ))}
            </ul>
          </nav>
        )}
        <div className={`space-y-14 ${toc.length ? "md:col-span-8 md:col-start-5" : "md:col-span-8"}`}>
          {page.sections.map((section) => (
            <section key={section.heading.en} id={section.id} data-reveal className="scroll-mt-28">
              <h2 className="font-display text-3xl text-rosewood md:text-4xl">{section.heading[lang]}</h2>
              <div className="mt-5 space-y-4 text-ink/80">
                {section.paragraphs.map((p) => <p key={p.en}>{p[lang]}</p>)}
              </div>
              {section.faqs && (
                <div className="mt-6 divide-y divide-rosewood/10 border-y border-rosewood/10">
                  {section.faqs.map((faq) => (
                    <details key={faq.q.en} className="group py-4">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-ink [&::-webkit-details-marker]:hidden">
                        {faq.q[lang]}
                        <CaretDown size={16} weight="light" className="shrink-0 transition-transform duration-300 ease-silk group-open:rotate-180" />
                      </summary>
                      <p className="pb-2 pt-2 text-sm leading-relaxed text-ink/70">{faq.a[lang]}</p>
                    </details>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
