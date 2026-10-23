"use client";

import { useSyncExternalStore } from "react";

// Minimal in-memory bag so the header count and add-to-bag feedback work.
// Task 4 (bag drawer, checkout) replaces this with the real commerce cart.

export type BagLine = { slug: string; shade: string; quantity: number };

let lines: BagLine[] = [];
const listeners = new Set<() => void>();

export function addToBag(slug: string, shade: string) {
  const existing = lines.find((l) => l.slug === slug && l.shade === shade);
  lines = existing
    ? lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + 1 } : l))
    : [...lines, { slug, shade, quantity: 1 }];
  listeners.forEach((notify) => notify());
}

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => listeners.delete(notify);
};

const getCount = () => lines.reduce((sum, l) => sum + l.quantity, 0);

export const useBagCount = () => useSyncExternalStore(subscribe, getCount, () => 0);
