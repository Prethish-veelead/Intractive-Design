// Sample catalog. The real commerce backend (open decision #2) replaces the functions at
// the bottom of this file; components only use those functions and the types.

export type Localized = { th: string; en: string };

export type CategorySlug = "lips" | "face" | "eyes" | "lashes" | "sets";

/** Decides which placeholder illustration ProductArt draws. */
export type ProductKind = "lipstick" | "tint" | "cushion" | "blush" | "powder" | "eyeliner" | "mascara" | "palette" | "lashes" | "set";

export type Shade = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  kind: ProductKind;
  tagline: Localized;
  price: number;
  shades: Shade[];
  badge?: "bestseller" | "new" | "limited";
  claims: Localized[];
  /** Thai FDA cosmetic notification number, filled in when registered. */
  fdaNumber?: string;
};

export const categories: CategorySlug[] = ["lips", "face", "eyes", "lashes", "sets"];

const longWear: Localized = { th: "ติดทนนาน 12 ชม.", en: "12-hour wear" };
const sweatProof: Localized = { th: "กันน้ำ กันเหงื่อ", en: "Water & sweat resistant" };
const oilControl: Localized = { th: "คุมมัน", en: "Oil control" };

const products: Product[] = [
  {
    slug: "velvet-kiss-matte-lipstick",
    name: "Velvet Kiss Matte Lipstick",
    category: "lips",
    kind: "lipstick",
    tagline: { th: "ลิปสติกเนื้อแมตต์นุ่มละมุน ไม่ทำให้ปากแห้ง", en: "Soft-matte lipstick that never dries your lips" },
    price: 590,
    badge: "bestseller",
    claims: [longWear, { th: "ไม่ติดแมสก์", en: "Transfer-proof" }],
    shades: [
      { name: "Rose Petal", hex: "#c46a73" },
      { name: "Thai Tea", hex: "#b5654a" },
      { name: "Mulberry", hex: "#7d2f45" },
      { name: "Nude Silk", hex: "#c48d7d" },
      { name: "Chili Red", hex: "#b3262f" },
      { name: "Lychee", hex: "#e08a8f" },
    ],
  },
  {
    slug: "dewy-glow-lip-tint",
    name: "Dewy Glow Lip Tint",
    category: "lips",
    kind: "tint",
    tagline: { th: "ลิปทินต์ฉ่ำวาว สีชัดตั้งแต่ปาดแรก", en: "Juicy glass-finish tint, rich from the first swipe" },
    price: 390,
    badge: "new",
    claims: [{ th: "ฉ่ำวาวไม่เหนียว", en: "Glossy, never sticky" }],
    shades: [
      { name: "Watermelon", hex: "#e4626b" },
      { name: "Peach Blossom", hex: "#ee9a83" },
      { name: "Plum Wine", hex: "#8c3550" },
      { name: "Mango Rose", hex: "#e07d63" },
    ],
  },
  {
    slug: "satin-bloom-lipstick",
    name: "Satin Bloom Lipstick",
    category: "lips",
    kind: "lipstick",
    tagline: { th: "ลิปสติกเนื้อซาตินชุ่มชื่น สีสวยเป็นธรรมชาติ", en: "Hydrating satin lipstick with natural color" },
    price: 650,
    claims: [{ th: "บำรุงริมฝีปาก", en: "Lip-caring formula" }],
    shades: [
      { name: "Lotus", hex: "#d98c94" },
      { name: "Cinnamon", hex: "#9c5a48" },
      { name: "Orchid", hex: "#b45d86" },
    ],
  },
  {
    slug: "skin-silk-cushion",
    name: "Skin Silk Cushion SPF50+",
    category: "face",
    kind: "cushion",
    tagline: { th: "คุชชั่นผิวโกลว์ บางเบา ปกปิดเรียบเนียน", en: "Lightweight glow cushion with smooth coverage" },
    price: 990,
    badge: "bestseller",
    claims: [oilControl, { th: "SPF50+ PA++++", en: "SPF50+ PA++++" }],
    shades: [
      { name: "N10 Porcelain", hex: "#f1d6c3" },
      { name: "N20 Ivory", hex: "#e8c5a8" },
      { name: "N23 Natural", hex: "#dbb08d" },
      { name: "W25 Honey", hex: "#c99a72" },
      { name: "W30 Tan", hex: "#b18060" },
    ],
  },
  {
    slug: "petal-blush",
    name: "Petal Soft Blush",
    category: "face",
    kind: "blush",
    tagline: { th: "บลัชออนเนื้อฝุ่นละเอียด เกลี่ยง่าย แก้มอมชมพู", en: "Silky powder blush for a soft flushed cheek" },
    price: 450,
    claims: [{ th: "เกลี่ยง่าย ไม่เป็นคราบ", en: "Blends without patches" }],
    shades: [
      { name: "Sakura", hex: "#eda7ad" },
      { name: "Apricot", hex: "#efa585" },
      { name: "Rosewood", hex: "#c47a7c" },
    ],
  },
  {
    slug: "airy-loose-powder",
    name: "Airy Loose Powder",
    category: "face",
    kind: "powder",
    tagline: { th: "แป้งฝุ่นคุมมัน เบาสบายแม้อากาศร้อน", en: "Oil-control loose powder made for hot days" },
    price: 420,
    claims: [oilControl, longWear],
    shades: [
      { name: "Translucent", hex: "#f3e6dc" },
      { name: "Warm Beige", hex: "#e3c4a6" },
    ],
  },
  {
    slug: "precision-ink-eyeliner",
    name: "Precision Ink Eyeliner",
    category: "eyes",
    kind: "eyeliner",
    tagline: { th: "อายไลเนอร์หัวพู่กันเล็ก กรีดง่าย คมชัด", en: "Ultra-fine brush liner for a sharp, easy wing" },
    price: 350,
    badge: "bestseller",
    claims: [sweatProof, { th: "แห้งไว ไม่เลอะ", en: "Quick-dry, smudge-proof" }],
    shades: [
      { name: "Jet Black", hex: "#1c1416" },
      { name: "Espresso", hex: "#4a2c22" },
    ],
  },
  {
    slug: "lift-curl-mascara",
    name: "Lift & Curl Mascara",
    category: "eyes",
    kind: "mascara",
    tagline: { th: "มาสคาร่าขนตางอนเด้ง ยาว ไม่จับตัวเป็นก้อน", en: "Lifting mascara for long, clump-free lashes" },
    price: 420,
    claims: [sweatProof, longWear],
    shades: [{ name: "Black", hex: "#1c1416" }],
  },
  {
    slug: "golden-hour-eyeshadow-palette",
    name: "Golden Hour Eyeshadow Palette",
    category: "eyes",
    kind: "palette",
    tagline: { th: "พาเลตต์อายแชโดว์ 9 สี โทนอบอุ่น ใช้ได้ทุกวัน", en: "Nine warm everyday shades, matte to shimmer" },
    price: 890,
    badge: "limited",
    claims: [{ th: "สีแน่น ติดทน", en: "Rich pigment, lasting color" }],
    shades: [{ name: "Golden Hour", hex: "#c48a62" }],
  },
  {
    slug: "natural-flutter-lashes",
    name: "Natural Flutter Lashes",
    category: "lashes",
    kind: "lashes",
    tagline: { th: "ขนตาปลอมแบบธรรมชาติ น้ำหนักเบา ใส่สบาย", en: "Featherlight lashes for a natural flutter" },
    price: 290,
    claims: [{ th: "ใช้ซ้ำได้ 15 ครั้ง", en: "Reusable up to 15 times" }],
    shades: [{ name: "Natural", hex: "#2b1e22" }],
  },
  {
    slug: "glam-volume-lashes",
    name: "Glam Volume Lashes",
    category: "lashes",
    kind: "lashes",
    tagline: { th: "ขนตาปลอมวอลลุ่ม สำหรับลุคออกงาน", en: "Full-volume lashes for evening looks" },
    price: 320,
    badge: "new",
    claims: [{ th: "ใช้ซ้ำได้ 15 ครั้ง", en: "Reusable up to 15 times" }],
    shades: [{ name: "Glam", hex: "#1c1416" }],
  },
  {
    slug: "signature-makeup-kit",
    name: "Signature Makeup Kit",
    category: "sets",
    kind: "set",
    tagline: { th: "เซ็ตแต่งหน้าครบลุค ลิป บลัช อายไลเนอร์ ในกล่องของขวัญ", en: "Lipstick, blush and liner in a gift box" },
    price: 1290,
    badge: "limited",
    claims: [{ th: "พร้อมกล่องของขวัญ", en: "Gift-boxed" }],
    shades: [{ name: "Rose Edition", hex: "#c97b84" }],
  },
];

export async function getProducts(category?: CategorySlug): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getBestsellers(): Promise<Product[]> {
  const featured = products.filter((p) => p.badge === "bestseller");
  return [...featured, ...products.filter((p) => !featured.includes(p))].slice(0, 8);
}

export const isCategory = (value: string): value is CategorySlug =>
  (categories as string[]).includes(value);
