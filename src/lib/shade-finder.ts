// Shade finder rules: three answers → cushion, lip and blush recommendations.
// Shade names must match catalog.ts. Review with a makeup artist before launch.

export type SkinTone = "fair" | "light" | "medium" | "tan" | "deep";
export type Undertone = "warm" | "cool" | "neutral";
export type LipFinish = "matte" | "satin" | "glossy";

export type Answers = { tone: SkinTone; undertone: Undertone; finish: LipFinish };
export type Pick = { role: "base" | "lips" | "cheeks"; slug: string; shade: string };

const cushionByTone: Record<SkinTone, string> = {
  fair: "N10 Porcelain",
  light: "N20 Ivory",
  medium: "N23 Natural",
  tan: "W25 Honey",
  deep: "W30 Tan",
};

const lips: Record<LipFinish, { slug: string; shades: Record<Undertone, string> }> = {
  matte: { slug: "velvet-kiss-matte-lipstick", shades: { warm: "Thai Tea", cool: "Mulberry", neutral: "Nude Silk" } },
  satin: { slug: "satin-bloom-lipstick", shades: { warm: "Cinnamon", cool: "Orchid", neutral: "Lotus" } },
  glossy: { slug: "dewy-glow-lip-tint", shades: { warm: "Mango Rose", cool: "Plum Wine", neutral: "Watermelon" } },
};

function blushFor({ tone, undertone }: Answers): string {
  if (undertone === "warm") return "Apricot";
  return tone === "tan" || tone === "deep" ? "Rosewood" : "Sakura";
}

export function recommend(answers: Answers): Pick[] {
  const lip = lips[answers.finish];
  return [
    { role: "base", slug: "skin-silk-cushion", shade: cushionByTone[answers.tone] },
    { role: "lips", slug: lip.slug, shade: lip.shades[answers.undertone] },
    { role: "cheeks", slug: "petal-blush", shade: blushFor(answers) },
  ];
}
