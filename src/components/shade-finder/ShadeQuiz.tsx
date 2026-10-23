"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import type { Product } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { recommend, type Answers, type LipFinish, type SkinTone, type Undertone } from "@/lib/shade-finder";
import { duration, ease, gsap, motionOk, useGSAP } from "@/lib/motion";
import { ProductArt } from "@/components/ui/ProductArt";

type Props = {
  lang: Locale;
  labels: Dictionary["shadeFinder"];
  /** Products the rules can recommend (cushion, lipsticks, tint, blush). */
  products: Pick<Product, "slug" | "name" | "kind" | "shades">[];
};

const tones: { id: SkinTone; hex: string }[] = [
  { id: "fair", hex: "#f1d6c3" },
  { id: "light", hex: "#e8c5a8" },
  { id: "medium", hex: "#dbb08d" },
  { id: "tan", hex: "#b88761" },
  { id: "deep", hex: "#8d5d43" },
];
const undertones: Undertone[] = ["warm", "cool", "neutral"];
const finishes: LipFinish[] = ["matte", "satin", "glossy"];

export function ShadeQuiz({ lang, labels, products }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const step = answers.tone === undefined ? 0 : answers.undertone === undefined ? 1 : answers.finish === undefined ? 2 : 3;

  // Each new step fades up.
  useGSAP(
    () => {
      if (!window.matchMedia(motionOk).matches) return;
      gsap.fromTo("[data-step]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: duration.reveal, ease: ease.silk });
    },
    { scope: root, dependencies: [step] },
  );

  const back = () =>
    setAnswers((a) => (step === 3 ? { ...a, finish: undefined } : step === 2 ? { ...a, undertone: undefined } : { ...a, tone: undefined }));

  return (
    <div ref={root} className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft">
      <div className="rounded-[calc(2.5rem-0.5rem)] bg-ivory px-5 py-10 md:px-12 md:py-14">
        {step < 3 && (
          <div className="mb-8 flex items-center justify-between text-sm text-ink/60">
            <span aria-live="polite">{labels.step} {step + 1} {labels.of} 3</span>
            <span className="flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= step ? "bg-rosewood" : "bg-nude/60"}`} />
              ))}
            </span>
          </div>
        )}

        <div data-step key={step}>
          {step === 0 && (
            <Question title={labels.q1}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {tones.map((tone) => (
                  <OptionButton key={tone.id} onClick={() => setAnswers({ tone: tone.id })}>
                    <span className="mx-auto block h-14 w-14 rounded-full ring-1 ring-rosewood/10" style={{ background: `radial-gradient(circle at 35% 30%, #ffffff66, ${tone.hex} 60%)` }} />
                    <span className="mt-3 block">{labels.tones[tone.id]}</span>
                  </OptionButton>
                ))}
              </div>
            </Question>
          )}
          {step === 1 && (
            <Question title={labels.q2} hint={labels.q2hint}>
              <div className="grid gap-3">
                {undertones.map((u) => (
                  <OptionButton key={u} onClick={() => setAnswers((a) => ({ ...a, undertone: u }))} align="left">
                    {labels.undertones[u]}
                  </OptionButton>
                ))}
              </div>
            </Question>
          )}
          {step === 2 && (
            <Question title={labels.q3}>
              <div className="grid gap-3 sm:grid-cols-3">
                {finishes.map((f) => (
                  <OptionButton key={f} onClick={() => setAnswers((a) => ({ ...a, finish: f }))}>
                    {labels.finishes[f]}
                  </OptionButton>
                ))}
              </div>
            </Question>
          )}
          {step === 3 && <Results lang={lang} labels={labels} products={products} answers={answers as Answers} />}
        </div>

        {step > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={back} className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm text-rosewood ring-1 ring-rosewood/20 hover:bg-blush/60">
              <ArrowLeft size={16} weight="light" /> {labels.back}
            </button>
            {step === 3 && (
              <button type="button" onClick={() => setAnswers({})} className="min-h-11 rounded-full px-5 text-sm text-ink/70 hover:text-rosewood">
                {labels.restart}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Question({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display text-3xl text-rosewood md:text-4xl">{title}</legend>
      {hint && <p className="mt-2 text-sm text-ink/60">{hint}</p>}
      <div className="mt-8">{children}</div>
    </fieldset>
  );
}

function OptionButton({ onClick, align = "center", children }: { onClick: () => void; align?: "center" | "left"; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-14 rounded-3xl bg-white/70 px-5 py-4 text-sm text-ink ring-1 ring-rosewood/10 transition-[background-color,transform,box-shadow] duration-300 ease-press hover:bg-blush/50 hover:shadow-soft active:scale-[0.98] ${align === "left" ? "text-left" : "text-center"}`}
    >
      {children}
    </button>
  );
}

function Results({ lang, labels, products, answers }: { lang: Locale; labels: Dictionary["shadeFinder"]; products: Props["products"]; answers: Answers }) {
  const roleLabel = { base: labels.base, lips: labels.lips, cheeks: labels.cheeks };
  return (
    <div>
      <h2 className="font-display text-3xl text-rosewood md:text-4xl">{labels.resultTitle}</h2>
      <p className="mt-2 text-sm text-ink/60">{labels.resultIntro}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {recommend(answers).map((pick) => {
          const product = products.find((p) => p.slug === pick.slug);
          const shade = product?.shades.find((s) => s.name === pick.shade);
          if (!product || !shade) return null;
          return (
            <li key={pick.role}>
              <Link href={`/${lang}/product/${product.slug}`} className="group flex h-full flex-col rounded-3xl bg-blush/40 p-5 ring-1 ring-rosewood/5 transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-1 hover:shadow-lift">
                <span className="eyebrow text-[10px] text-rose">{roleLabel[pick.role]}</span>
                <span className="relative my-4 block aspect-square">
                  <ProductArt kind={product.kind} color={shade.hex} className="absolute inset-0 h-full w-full" />
                </span>
                <span className="font-display text-xl text-ink">{product.name}</span>
                <span className="mt-1 flex items-center justify-between text-sm text-ink/70">
                  {shade.name}
                  <ArrowUpRight size={16} weight="light" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
