"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";
import type { Feature, Finish, ShadeFamily } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";
import { ScrollTrigger } from "@/lib/motion";

export type FilterItem = {
  slug: string;
  price: number;
  rating: number;
  finish: Finish;
  features: Feature[];
  families: ShadeFamily[];
};

type PriceBand = "under500" | "500to1000" | "over1000";
type Sort = "featured" | "priceLow" | "priceHigh" | "rating";

const priceBands: Record<PriceBand, (p: number) => boolean> = {
  under500: (p) => p < 500,
  "500to1000": (p) => p >= 500 && p <= 1000,
  over1000: (p) => p > 1000,
};

type Props = {
  items: FilterItem[];
  /** Server-rendered product cards keyed by slug. */
  cards: Record<string, React.ReactNode>;
  labels: Dictionary["filters"];
};

/**
 * Filter chips + sort for a category grid. Cards stay mounted and are hidden/reordered,
 * so scroll reveals (RevealRoot) keep working after filtering.
 */
export function ProductFilters({ items, cards, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [families, setFamilies] = useState<ShadeFamily[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [prices, setPrices] = useState<PriceBand[]>([]);
  const [sort, setSort] = useState<Sort>("featured");

  // Only offer options that exist in this category.
  const available = {
    finishes: unique(items.map((i) => i.finish)),
    families: unique(items.flatMap((i) => i.families)),
    features: unique(items.flatMap((i) => i.features)),
    prices: (Object.keys(priceBands) as PriceBand[]).filter((b) => items.some((i) => priceBands[b](i.price))),
  };

  const visible = items.filter(
    (i) =>
      (!finishes.length || finishes.includes(i.finish)) &&
      (!families.length || i.families.some((f) => families.includes(f))) &&
      features.every((f) => i.features.includes(f)) &&
      (!prices.length || prices.some((b) => priceBands[b](i.price))),
  );
  const ordered = [...visible].sort((a, b) =>
    sort === "priceLow" ? a.price - b.price : sort === "priceHigh" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0,
  );
  const position = new Map(ordered.map((i, index) => [i.slug, index]));
  const activeCount = finishes.length + families.length + features.length + prices.length;

  // Cards moved, so scroll-reveal trigger positions are stale.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [finishes, families, features, prices, sort]);

  const clear = () => {
    setFinishes([]);
    setFamilies([]);
    setFeatures([]);
    setPrices([]);
  };

  const priceLabel: Record<PriceBand, string> = {
    under500: labels.priceUnder500,
    "500to1000": labels.price500to1000,
    over1000: labels.priceOver1000,
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="filter-panel"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm text-rosewood ring-1 ring-rosewood/20 transition-colors hover:bg-blush/60"
        >
          <SlidersHorizontal size={18} weight="light" />
          {labels.title}
          {activeCount > 0 && <span className="rounded-full bg-rosewood px-2 text-[11px] text-ivory">{activeCount}</span>}
        </button>
        <div className="flex items-center gap-4">
          <p className="text-sm text-ink/60" aria-live="polite">
            {visible.length} {labels.results}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <span className="hidden sm:inline">{labels.sort}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-11 rounded-full bg-white/60 px-4 text-sm text-ink ring-1 ring-rosewood/15"
            >
              <option value="featured">{labels.sortFeatured}</option>
              <option value="priceLow">{labels.sortPriceLow}</option>
              <option value="priceHigh">{labels.sortPriceHigh}</option>
              <option value="rating">{labels.sortRating}</option>
            </select>
          </label>
        </div>
      </div>

      <div id="filter-panel" hidden={!open} className="mb-10 space-y-5 rounded-card bg-white/50 p-5 ring-1 ring-rosewood/5 md:p-7">
        <ChipGroup title={labels.finish} options={available.finishes} selected={finishes} onChange={setFinishes} label={(f) => labels.finishes[f]} />
        <ChipGroup title={labels.shadeFamily} options={available.families} selected={families} onChange={setFamilies} label={(f) => labels.families[f]} />
        <ChipGroup title={labels.features} options={available.features} selected={features} onChange={setFeatures} label={(f) => labels.featureNames[f]} />
        <ChipGroup title={labels.price} options={available.prices} selected={prices} onChange={setPrices} label={(b) => priceLabel[b]} />
        {activeCount > 0 && (
          <button type="button" onClick={clear} className="text-sm text-rosewood underline underline-offset-4">
            {labels.clear}
          </button>
        )}
      </div>

      {visible.length === 0 && <p className="py-16 text-center text-ink/60">{labels.noResults}</p>}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.slug} data-reveal hidden={!position.has(item.slug)} style={{ order: position.get(item.slug) }}>
            {cards[item.slug]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChipGroup<T extends string>({ title, options, selected, onChange, label }: {
  title: string;
  options: T[];
  selected: T[];
  onChange: (next: T[]) => void;
  label: (option: T) => string;
}) {
  if (options.length < 2) return null; // a single option filters nothing
  const toggle = (option: T) => onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option]);
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-[10px] text-ink/50">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(option)}
              className={`min-h-10 rounded-full px-4 text-sm transition-[background-color,color,transform] duration-300 ease-press active:scale-95 ${on ? "bg-rosewood text-ivory" : "bg-ivory text-ink/80 ring-1 ring-rosewood/15 hover:bg-blush/60"}`}
            >
              {label(option)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const unique = <T,>(values: T[]) => [...new Set(values)];
