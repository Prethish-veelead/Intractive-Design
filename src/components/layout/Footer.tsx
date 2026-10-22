import Link from "next/link";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

const payments = ["PromptPay", "TrueMoney", "Rabbit LINE Pay", "Visa", "Mastercard"];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const help = [
    { href: "help#shipping", label: f.shipping },
    { href: "help#returns", label: f.returns },
    { href: "help#payment", label: f.payment },
    { href: "help#faq", label: f.faq },
    { href: "contact", label: f.contact },
  ];
  const legal = [
    { href: "privacy", label: f.privacy },
    { href: "terms", label: f.terms },
    { href: "cookies", label: f.cookies },
  ];

  return (
    <footer className="mt-24 bg-rosewood text-ivory">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-[0.18em]">{site.brand}</p>
          <p className="mt-4 max-w-xs text-sm text-ivory/70">{f.tagline}</p>
        </div>
        <FooterList title={f.shop} links={categories.map((c) => ({ href: `shop/${c}`, label: dict.categories[c] }))} lang={lang} />
        <FooterList title={f.help} links={help} lang={lang} />
        <div className="md:col-span-3">
          <p className="eyebrow text-[11px] text-ivory/50">{f.payWith}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {payments.map((p) => (
              <li key={p} className="rounded-full px-3 py-1 text-xs text-ivory/80 ring-1 ring-ivory/20">{p}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {site.brand}. {f.rights}</p>
          <ul className="flex flex-wrap gap-5">
            {legal.map((l) => (
              <li key={l.href}><Link href={`/${lang}/${l.href}`} className="hover:text-ivory">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links, lang }: { title: string; links: { href: string; label: string }[]; lang: Locale }) {
  return (
    <div className="md:col-span-2">
      <p className="eyebrow text-[11px] text-ivory/50">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
        {links.map((l) => (
          <li key={l.href}><Link href={`/${lang}/${l.href}`} className="transition-colors hover:text-ivory">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
