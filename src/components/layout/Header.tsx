"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, MagnifyingGlass, UserCircle } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { BagLink } from "./BagLink";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { CategorySlug } from "@/lib/catalog";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  categories: Dictionary["categories"];
};

const shopLinks: CategorySlug[] = ["lips", "face", "eyes", "lashes", "sets"];

export function Header({ lang, nav, categories }: Props) {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const otherLang: Locale = lang === "th" ? "en" : "th";
  const switchHref = pathname.replace(/^\/(th|en)(?=\/|$)/, `/${otherLang}`);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const menuLinks = [
    ...shopLinks.map((c) => ({ href: `/${lang}/shop/${c}`, label: categories[c] })),
    { href: `/${lang}/shade-finder`, label: nav.shadeFinder },
    { href: `/${lang}/journal`, label: nav.journal },
    { href: `/${lang}/about`, label: nav.about },
  ];

  return (
    <header className="sticky top-3 z-40 px-4">
      {/* Named so it stays still during page view transitions. The name sits on the pill itself:
          on an ancestor it would become a backdrop root and break the pill's backdrop blur. */}
      <nav style={{ viewTransitionName: "site-header" }} className="relative z-50 mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full bg-ivory/75 px-3 shadow-soft ring-1 ring-rosewood/10 backdrop-blur-md md:px-5">
        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="relative flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          <span className="sr-only">{open ? nav.close : nav.menu}</span>
          <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-silk ${open ? "rotate-45" : "-translate-y-[3.5px]"}`} />
          <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-silk ${open ? "-rotate-45" : "translate-y-[3.5px]"}`} />
        </button>

        <Link href={`/${lang}`} className="font-display text-2xl tracking-[0.18em] text-rosewood lg:ml-2">
          {site.brand}
        </Link>

        <ul className="hidden items-center gap-7 text-sm text-ink/80 lg:flex">
          {shopLinks.map((c) => (
            <li key={c}>
              <Link href={`/${lang}/shop/${c}`} className="transition-colors duration-300 hover:text-rosewood">
                {categories[c]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-0.5 text-ink">
          <Link href={switchHref} className="hidden rounded-full px-3 py-2 text-xs text-ink/70 transition-colors hover:text-rosewood sm:block">
            {nav.switchLanguage}
          </Link>
          <IconLink href={`/${lang}/search`} label={nav.search}><MagnifyingGlass size={20} weight="light" /></IconLink>
          <IconLink href={`/${lang}/wishlist`} label={nav.wishlist} className="hidden sm:flex"><Heart size={20} weight="light" /></IconLink>
          <IconLink href={`/${lang}/account`} label={nav.account} className="hidden sm:flex"><UserCircle size={20} weight="light" /></IconLink>
          <BagLink href={`/${lang}/bag`} label={nav.bag} />
        </div>
      </nav>

      {/* Mobile menu: full-screen glass overlay, links rise in one after another. */}
      <div
        id="site-menu"
        // Blur only while open: a full-screen backdrop-filter costs frames on every scroll even when invisible.
        className={`fixed inset-0 z-40 bg-ivory/90 transition-[opacity,visibility] duration-500 ease-silk lg:hidden ${open ? "opacity-100 backdrop-blur-2xl" : "pointer-events-none invisible opacity-0"}`}
        inert={!open}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-8 pt-16">
          {menuLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-700 ease-silk ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <Link href={link.href} className="font-display text-4xl text-rosewood">
                {link.label}
              </Link>
            </li>
          ))}
          <li className={`mt-6 transition-all duration-700 ease-silk ${open ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: open ? "500ms" : "0ms" }}>
            <Link href={switchHref} className="text-sm text-ink/70">{nav.switchLanguage}</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function IconLink({ href, label, className = "", children }: { href: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} aria-label={label} className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-blush/60 ${className}`}>
      {children}
    </Link>
  );
}
