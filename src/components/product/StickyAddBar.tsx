"use client";

import { useEffect, useState } from "react";
import { ChatCircleDots } from "@phosphor-icons/react";
import type { Shade } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Price } from "@/components/ui/Price";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";

type Props = {
  /** The main Add-to-bag button; the bar shows once it has scrolled up out of view. */
  target: React.RefObject<HTMLElement | null>;
  shade: Shade;
  price: number;
  lang: Locale;
  /** Accessible name of the bar's LINE chat button. */
  lineLabel: string;
  onAdd: () => void;
  /** Button content, shared with the main button so both show the same "✓ Added" state. */
  children: React.ReactNode;
};

/**
 * Phones only: a bar with the picked shade, price, LINE chat and Add to bag that slides up while
 * the main button is scrolled past. It sets `data-sticky-bar` on <html> so the floating LINE button
 * hides while the bar is shown and the page gets room at the bottom (globals.css).
 */
export function StickyAddBar({ target, shade, price, lang, lineLabel, onAdd, children }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    // The root reaches far below the screen, so the button only "leaves" it by scrolling up past
    // the top. A plain observer misses a fast jump from below the screen to above it (no
    // threshold is crossed). The top margin skips the floating header, which covers the button.
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      rootMargin: "-72px 0px 100000px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.stickyBar = shown ? "shown" : "hidden";
    return () => {
      delete html.dataset.stickyBar;
    };
  }, [shown]);

  return (
    <div
      data-sticky-add
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-[350ms] ease-silk md:hidden ${shown ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className={`flex items-center gap-3 border-t border-rosewood/10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 ${shown ? "bg-ivory/85 backdrop-blur-md" : "bg-ivory"}`}>
        <ShadeSwatch hex={shade.hex} size="lg" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm text-ink">{shade.name}</p>
          <Price amount={price} lang={lang} className="text-sm text-ink/70" />
        </div>
        <a
          href={site.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lineLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-line text-white transition-transform duration-300 ease-press active:scale-95"
        >
          <ChatCircleDots size={22} weight="fill" />
        </a>
        <button
          type="button"
          onClick={onAdd}
          className="relative h-12 shrink-0 overflow-hidden rounded-full bg-rosewood px-6 text-sm font-medium text-ivory transition-[background-color,transform] duration-500 ease-press hover:bg-rosewood-deep active:scale-[0.98]"
        >
          {children}
        </button>
      </div>
    </div>
  );
}
