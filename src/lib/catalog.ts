import { findImage, toSlug } from "./images";

// Sample catalog. The real commerce backend (open decision #2) replaces the functions at
// the bottom of this file; components only use those functions and the types.
// Ingredients and reviews are SAMPLE DATA (see project-info/docs/brand-voice.md#content-status).

export type Localized = { th: string; en: string };

export type CategorySlug = "lips" | "face" | "eyes" | "lashes" | "sets";

/** Decides which placeholder illustration ProductArt draws. */
export type ProductKind = "lipstick" | "tint" | "cushion" | "blush" | "powder" | "eyeliner" | "mascara" | "palette" | "lashes" | "set";

export type Finish = "matte" | "satin" | "glossy" | "dewy" | "natural" | "shimmer";
export type Feature = "longWear" | "waterproof" | "oilControl" | "spf" | "transferProof";
export type ShadeFamily = "nude" | "pink" | "red" | "berry" | "coral" | "brown" | "black";

/** `image` is the packshot photo for this shade, when one exists in public/images. */
export type Shade = { name: string; hex: string; family: ShadeFamily; image?: string };

export type Review = { name: string; city: string; rating: number; text: Localized };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  kind: ProductKind;
  tagline: Localized;
  description: Localized;
  howTo: Localized[];
  price: number;
  shades: Shade[];
  finish: Finish;
  features: Feature[];
  badge?: "bestseller" | "new" | "limited";
  /** Product-specific highlights shown as chips. */
  claims: Localized[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  /** Thai FDA cosmetic notification number, filled in when registered. */
  fdaNumber?: string;
};

export const categories: CategorySlug[] = ["lips", "face", "eyes", "lashes", "sets"];

const longWear: Localized = { th: "ติดทนนาน 12 ชม.", en: "12-hour wear" };
const sweatProof: Localized = { th: "กันน้ำ กันเหงื่อ", en: "Water & sweat resistant" };
const oilControl: Localized = { th: "คุมมัน", en: "Oil control" };
const reusable: Localized = { th: "ใช้ซ้ำได้ 15 ครั้ง", en: "Reusable up to 15 times" };

// Sample INCI lists per product type, until supplier data arrives.
export const ingredientsByKind: Record<ProductKind, string> = {
  lipstick: "Diisostearyl Malate, Polyethylene, Octyldodecanol, Silica, Hydrogenated Polyisobutene, Caprylic/Capric Triglyceride, Shea Butter, Tocopheryl Acetate, May contain: CI 77891, CI 15850, CI 77491, CI 45410",
  tint: "Water, Glycerin, Butylene Glycol, Polyglyceryl-2 Triisostearate, Hydrogenated Polyisobutene, Sodium Hyaluronate, Ceramide NP, Phenoxyethanol, May contain: CI 15850, CI 45410, CI 17200",
  cushion: "Water, Cyclopentasiloxane, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Zinc Oxide, Niacinamide, Glycerin, Centella Asiatica Extract, Dimethicone, Phenoxyethanol, May contain: CI 77891, CI 77492, CI 77491, CI 77499",
  blush: "Talc, Mica, Zinc Stearate, Dimethicone, Caprylic/Capric Triglyceride, Silica, Tocopherol, May contain: CI 77891, CI 15850, CI 77491",
  powder: "Silica, Mica, Talc, Zinc Stearate, Rice Starch (Oryza Sativa), Dimethicone, Tocopherol, May contain: CI 77891, CI 77492",
  eyeliner: "Water, Styrene/Acrylates Copolymer, Butylene Glycol, Polyurethane-35, Glycerin, Phenoxyethanol, CI 77266 (Black 2)",
  mascara: "Water, Beeswax, Acrylates Copolymer, Copernicia Cerifera (Carnauba) Wax, Stearic Acid, Panthenol, Phenoxyethanol, CI 77499",
  palette: "Talc, Mica, Magnesium Stearate, Dimethicone, Octyldodecyl Stearoyl Stearate, Silica, May contain: CI 77891, CI 77491, CI 77492, CI 77499, CI 77742",
  lashes: "Synthetic fibre (PBT), cotton band. Lash glue sold separately.",
  set: "See each product in the set for its full ingredient list.",
};

const products: Product[] = [
  {
    slug: "velvet-kiss-matte-lipstick",
    name: "Velvet Kiss Matte Lipstick",
    category: "lips",
    kind: "lipstick",
    tagline: { th: "ลิปสติกเนื้อแมตต์นุ่มละมุน ไม่ทำให้ปากแห้ง", en: "Soft-matte lipstick that never dries your lips" },
    description: {
      th: "เนื้อแมตต์ที่นุ่มเหมือนกำมะหยี่ เกลี่ยง่ายในครั้งเดียว สีชัดแต่ไม่หนักปาก ผสมเชียบัตเตอร์ช่วยให้ริมฝีปากรู้สึกสบายตลอดวัน ติดทนแม้อากาศร้อนชื้น",
      en: "A velvety matte that glides on in one stroke. Rich colour that feels light, with shea butter to keep lips comfortable all day, even in hot, humid weather.",
    },
    howTo: [
      { th: "ทาจากกลางริมฝีปากออกไปด้านข้าง", en: "Apply from the centre of the lips outwards." },
      { th: "ใช้ขอบแท่งลิปเก็บขอบปากให้คม", en: "Use the edge of the bullet to define the lip line." },
      { th: "ต้องการลุคนุ่ม ใช้นิ้วแตะเกลี่ยขอบปาก", en: "For a soft-focus look, blur the edges with a fingertip." },
    ],
    price: 590,
    finish: "matte",
    features: ["longWear", "transferProof"],
    badge: "bestseller",
    claims: [longWear, { th: "ไม่ติดแมสก์", en: "Transfer-proof" }],
    rating: 4.8,
    reviewCount: 214,
    reviews: [
      { name: "คุณแพรว", city: "กรุงเทพฯ", rating: 5, text: { th: "แมตต์แต่ไม่แห้งจริง ๆ ทาเช้าอยู่ถึงเย็นค่ะ", en: "Matte but truly not drying. On in the morning, still there in the evening." } },
      { name: "คุณนุ่น", city: "ขอนแก่น", rating: 5, text: { th: "สี Thai Tea สวยมาก เข้ากับผิวสองสี", en: "Thai Tea is gorgeous on medium skin." } },
    ],
    shades: [
      { name: "Rose Petal", hex: "#c46a73", family: "pink" },
      { name: "Thai Tea", hex: "#b5654a", family: "coral" },
      { name: "Mulberry", hex: "#7d2f45", family: "berry" },
      { name: "Nude Silk", hex: "#c48d7d", family: "nude" },
      { name: "Chili Red", hex: "#b3262f", family: "red" },
      { name: "Lychee", hex: "#e08a8f", family: "pink" },
    ],
  },
  {
    slug: "dewy-glow-lip-tint",
    name: "Dewy Glow Lip Tint",
    category: "lips",
    kind: "tint",
    tagline: { th: "ลิปทินต์ฉ่ำวาว สีชัดตั้งแต่ปาดแรก", en: "Juicy glass-finish tint, rich from the first swipe" },
    description: {
      th: "ทินต์เนื้อเจลที่ให้ปากฉ่ำวาวเหมือนแก้ว ไม่เหนียวเหนอะหนะ สีค่อย ๆ ติดลงบนริมฝีปาก แม้วาวจางไปแล้วสียังสวยอยู่",
      en: "A gel tint with a glass-like shine that never feels sticky. The colour stains softly, so it stays pretty after the gloss fades.",
    },
    howTo: [
      { th: "แตะกลางริมฝีปาก แล้วเม้มปากเบา ๆ", en: "Dab onto the centre of the lips and press them together." },
      { th: "ทาซ้ำเพื่อเพิ่มความชัด", en: "Layer for more intensity." },
    ],
    price: 390,
    finish: "glossy",
    features: [],
    badge: "new",
    claims: [{ th: "ฉ่ำวาวไม่เหนียว", en: "Glossy, never sticky" }],
    rating: 4.6,
    reviewCount: 87,
    reviews: [
      { name: "คุณมิว", city: "เชียงใหม่", rating: 5, text: { th: "ฉ่ำมาก ปากดูอิ่มขึ้นเลยค่ะ", en: "So juicy, my lips look fuller." } },
      { name: "คุณพลอย", city: "ชลบุรี", rating: 4, text: { th: "สีสวย แต่ต้องเติมหลังกินข้าว", en: "Lovely colour, needs a top-up after meals." } },
    ],
    shades: [
      { name: "Watermelon", hex: "#e4626b", family: "red" },
      { name: "Peach Blossom", hex: "#ee9a83", family: "coral" },
      { name: "Plum Wine", hex: "#8c3550", family: "berry" },
      { name: "Mango Rose", hex: "#e07d63", family: "coral" },
    ],
  },
  {
    slug: "satin-bloom-lipstick",
    name: "Satin Bloom Lipstick",
    category: "lips",
    kind: "lipstick",
    tagline: { th: "ลิปสติกเนื้อซาตินชุ่มชื่น สีสวยเป็นธรรมชาติ", en: "Hydrating satin lipstick with natural colour" },
    description: {
      th: "เนื้อซาตินที่เงาบางเบา ให้ความชุ่มชื้นเหมือนลิปบาล์ม แต่สีชัดเหมือนลิปสติก เหมาะกับลุคประจำวัน",
      en: "A soft satin sheen that cares like a balm and colours like a lipstick. Made for everyday looks.",
    },
    howTo: [
      { th: "ทาได้ทันทีโดยไม่ต้องใช้ลิปไลเนอร์", en: "Wear on its own, no liner needed." },
      { th: "ใช้ทับลิปแมตต์เพื่อเพิ่มความชุ่มชื้น", en: "Layer over a matte for extra comfort." },
    ],
    price: 650,
    finish: "satin",
    features: [],
    claims: [{ th: "บำรุงริมฝีปาก", en: "Lip-caring formula" }],
    rating: 4.7,
    reviewCount: 63,
    reviews: [
      { name: "คุณบีม", city: "กรุงเทพฯ", rating: 5, text: { th: "ทาแล้วปากนุ่ม สี Lotus ใช้ได้ทุกวันค่ะ", en: "Lips feel soft. Lotus is my everyday shade." } },
      { name: "คุณเฟิร์น", city: "นครราชสีมา", rating: 4, text: { th: "ชอบความชุ่มชื้น อยากให้มีสีเข้มเพิ่ม", en: "Love the hydration, wish there were deeper shades." } },
    ],
    shades: [
      { name: "Lotus", hex: "#d98c94", family: "pink" },
      { name: "Cinnamon", hex: "#9c5a48", family: "brown" },
      { name: "Orchid", hex: "#b45d86", family: "berry" },
    ],
  },
  {
    slug: "skin-silk-cushion",
    name: "Skin Silk Cushion SPF50+",
    category: "face",
    kind: "cushion",
    tagline: { th: "คุชชั่นผิวโกลว์ บางเบา ปกปิดเรียบเนียน", en: "Lightweight glow cushion with smooth coverage" },
    description: {
      th: "คุชชั่นเนื้อบางเบา ปกปิดระดับกลางและเกลี่ยเพิ่มได้ ผิวดูโกลว์อย่างเป็นธรรมชาติ ไม่เยิ้มแม้อากาศร้อน พร้อมกันแดด SPF50+ PA++++ และไนอาซินาไมด์",
      en: "A featherlight cushion with buildable medium coverage and a natural glow that stays fresh in the heat. With SPF50+ PA++++ and niacinamide.",
    },
    howTo: [
      { th: "กดพัฟลงบนคุชชั่นเบา ๆ", en: "Press the puff gently into the cushion." },
      { th: "ตบเบา ๆ จากกลางใบหน้าออกด้านนอก", en: "Pat from the centre of the face outwards." },
      { th: "ตบซ้ำเฉพาะจุดที่ต้องการปกปิดเพิ่ม", en: "Layer only where you want more coverage." },
    ],
    price: 990,
    finish: "dewy",
    features: ["oilControl", "spf", "longWear"],
    badge: "bestseller",
    claims: [oilControl, { th: "SPF50+ PA++++", en: "SPF50+ PA++++" }],
    rating: 4.7,
    reviewCount: 356,
    reviews: [
      { name: "คุณมายด์", city: "เชียงใหม่", rating: 5, text: { th: "เบามาก ไม่เยิ้มแม้อากาศร้อน สีเข้ากับผิวพอดี", en: "So light, doesn't get oily in the heat. Perfect shade match." } },
      { name: "คุณแอน", city: "หาดใหญ่", rating: 4, text: { th: "ผิวดูฉ่ำสวย ช่วงบ่ายต้องซับมันนิดหน่อย", en: "Lovely dewy skin, I blot a little in the afternoon." } },
    ],
    shades: [
      { name: "N10 Porcelain", hex: "#f1d6c3", family: "nude" },
      { name: "N20 Ivory", hex: "#e8c5a8", family: "nude" },
      { name: "N23 Natural", hex: "#dbb08d", family: "nude" },
      { name: "W25 Honey", hex: "#c99a72", family: "nude" },
      { name: "W30 Tan", hex: "#b18060", family: "brown" },
    ],
  },
  {
    slug: "petal-blush",
    name: "Petal Soft Blush",
    category: "face",
    kind: "blush",
    tagline: { th: "บลัชออนเนื้อฝุ่นละเอียด เกลี่ยง่าย แก้มอมชมพู", en: "Silky powder blush for a soft flushed cheek" },
    description: {
      th: "บลัชออนเนื้อฝุ่นละเอียดที่เกลี่ยง่ายไม่เป็นคราบ ให้แก้มอมชมพูเหมือนเพิ่งเดินกลับจากตลาดน้ำ เติมสีได้ตามต้องการ",
      en: "A finely milled powder blush that blends without patches for a fresh, just-flushed cheek. Build it up as you like.",
    },
    howTo: [
      { th: "ยิ้ม แล้วปัดบนโหนกแก้มเบา ๆ", en: "Smile and sweep lightly over the apples of the cheeks." },
      { th: "เกลี่ยขึ้นไปทางขมับ", en: "Blend up towards the temples." },
    ],
    price: 450,
    finish: "natural",
    features: [],
    claims: [{ th: "เกลี่ยง่าย ไม่เป็นคราบ", en: "Blends without patches" }],
    rating: 4.8,
    reviewCount: 142,
    reviews: [
      { name: "คุณใบเตย", city: "กรุงเทพฯ", rating: 5, text: { th: "สี Sakura น่ารักมาก ดูเป็นธรรมชาติค่ะ", en: "Sakura is so pretty and natural." } },
      { name: "คุณเจน", city: "ระยอง", rating: 5, text: { th: "เนื้อละเอียด เกลี่ยง่ายจริง", en: "Fine texture, really easy to blend." } },
    ],
    shades: [
      { name: "Sakura", hex: "#eda7ad", family: "pink" },
      { name: "Apricot", hex: "#efa585", family: "coral" },
      { name: "Rosewood", hex: "#c47a7c", family: "berry" },
    ],
  },
  {
    slug: "airy-loose-powder",
    name: "Airy Loose Powder",
    category: "face",
    kind: "powder",
    tagline: { th: "แป้งฝุ่นคุมมัน เบาสบายแม้อากาศร้อน", en: "Oil-control loose powder made for hot days" },
    description: {
      th: "แป้งฝุ่นเนื้อเบาที่ช่วยเซ็ตเมคอัพและคุมความมันได้ยาวนาน ผสมแป้งข้าวเจ้า ทำให้ผิวดูเรียบเนียนแบบไม่หนาเป็นชั้น",
      en: "A weightless setting powder that keeps shine away for hours. With rice starch for a smooth, never-cakey finish.",
    },
    howTo: [
      { th: "ใช้พัฟหรือแปรงแตะแป้งเล็กน้อย เคาะส่วนเกินออก", en: "Pick up a little powder with a puff or brush and tap off the excess." },
      { th: "กดเบา ๆ บริเวณ T-zone", en: "Press gently onto the T-zone." },
    ],
    price: 420,
    finish: "natural",
    features: ["oilControl", "longWear"],
    claims: [oilControl, longWear],
    rating: 4.6,
    reviewCount: 98,
    reviews: [
      { name: "คุณกิ๊ฟ", city: "กรุงเทพฯ", rating: 5, text: { th: "คุมมันดีมาก ผิวมันใช้แล้วรอดถึงเย็น", en: "Great oil control, my oily skin survives till evening." } },
      { name: "คุณออม", city: "อุดรธานี", rating: 4, text: { th: "เบาสบาย ไม่ทำให้หน้าดูแห้ง", en: "Light and comfortable, never looks dry." } },
    ],
    shades: [
      { name: "Translucent", hex: "#f3e6dc", family: "nude" },
      { name: "Warm Beige", hex: "#e3c4a6", family: "nude" },
    ],
  },
  {
    slug: "precision-ink-eyeliner",
    name: "Precision Ink Eyeliner",
    category: "eyes",
    kind: "eyeliner",
    tagline: { th: "อายไลเนอร์หัวพู่กันเล็ก กรีดง่าย คมชัด", en: "Ultra-fine brush liner for a sharp, easy wing" },
    description: {
      th: "หัวพู่กันเรียวเล็กพิเศษ ควบคุมเส้นได้ง่ายแม้มือใหม่ สีดำสนิทแห้งเร็ว กันน้ำ กันเหงื่อ ไม่เลอะระหว่างวัน",
      en: "An extra-fine brush tip that's easy to control, even for beginners. Deep black ink dries fast and resists water and sweat.",
    },
    howTo: [
      { th: "เริ่มเส้นจากกลางเปลือกตาไปหางตา", en: "Start in the middle of the lid and draw out to the outer corner." },
      { th: "ต่อเส้นจากหัวตามาบรรจบกัน", en: "Join it with a line from the inner corner." },
      { th: "ลากหางตาขึ้นตามแนวคิ้ว", en: "Flick the wing up towards the end of the brow." },
    ],
    price: 350,
    finish: "matte",
    features: ["waterproof", "longWear"],
    badge: "bestseller",
    claims: [sweatProof, { th: "แห้งไว ไม่เลอะ", en: "Quick-dry, smudge-proof" }],
    rating: 4.9,
    reviewCount: 402,
    reviews: [
      { name: "คุณฟ้า", city: "ภูเก็ต", rating: 5, text: { th: "กันน้ำได้จริง เล่นสงกรานต์ทั้งวันไม่เลอะเลยค่ะ", en: "Really waterproof. A whole day of Songkran and no smudging." } },
      { name: "คุณปราง", city: "กรุงเทพฯ", rating: 5, text: { th: "หัวเล็ก กรีดง่ายมากสำหรับมือใหม่", en: "Tiny tip, so easy for a beginner." } },
    ],
    shades: [
      { name: "Jet Black", hex: "#1c1416", family: "black" },
      { name: "Espresso", hex: "#4a2c22", family: "brown" },
    ],
  },
  {
    slug: "lift-curl-mascara",
    name: "Lift & Curl Mascara",
    category: "eyes",
    kind: "mascara",
    tagline: { th: "มาสคาร่าขนตางอนเด้ง ยาว ไม่จับตัวเป็นก้อน", en: "Lifting mascara for long, clump-free lashes" },
    description: {
      th: "แปรงทรงโค้งช่วยยกขนตาให้งอนตั้งแต่โคน สูตรน้ำหนักเบาไม่ทำให้ขนตาตก กันน้ำ กันเหงื่อ ล้างออกง่ายด้วยคลีนซิ่ง",
      en: "A curved brush lifts lashes from the root. The light formula holds the curl, resists water and sweat, and removes easily with cleanser.",
    },
    howTo: [
      { th: "ดัดขนตาก่อน", en: "Curl lashes first." },
      { th: "วางแปรงที่โคนขนตา แล้วส่ายแปรงขึ้นไปที่ปลาย", en: "Place the brush at the root and wiggle up to the tips." },
    ],
    price: 420,
    finish: "natural",
    features: ["waterproof", "longWear"],
    claims: [sweatProof, longWear],
    rating: 4.5,
    reviewCount: 120,
    reviews: [
      { name: "คุณหมิว", city: "เชียงราย", rating: 5, text: { th: "งอนทั้งวัน ไม่ตกเลยค่ะ", en: "Stays curled all day." } },
      { name: "คุณดาว", city: "กรุงเทพฯ", rating: 4, text: { th: "ไม่เป็นก้อน แต่อยากให้หนากว่านี้", en: "No clumps, but I'd like more volume." } },
    ],
    shades: [{ name: "Black", hex: "#1c1416", family: "black" }],
  },
  {
    slug: "golden-hour-eyeshadow-palette",
    name: "Golden Hour Eyeshadow Palette",
    category: "eyes",
    kind: "palette",
    tagline: { th: "พาเลตต์อายแชโดว์ 9 สี โทนอบอุ่น ใช้ได้ทุกวัน", en: "Nine warm everyday shades, matte to shimmer" },
    description: {
      th: "9 เฉดสีโทนน้ำตาลอบอุ่นและทอง ทั้งเนื้อแมตต์และชิมเมอร์ สร้างลุคได้ตั้งแต่ไปทำงานจนถึงงานกลางคืน",
      en: "Nine warm browns and golds in matte and shimmer finishes, from office looks to evenings out.",
    },
    howTo: [
      { th: "ใช้สีแมตต์อ่อนทั่วเปลือกตา", en: "Sweep a light matte over the lid." },
      { th: "เพิ่มมิติด้วยสีเข้มที่หางตา", en: "Add depth with a deeper shade at the outer corner." },
      { th: "แตะชิมเมอร์กลางเปลือกตา", en: "Tap shimmer onto the centre of the lid." },
    ],
    price: 890,
    finish: "shimmer",
    features: ["longWear"],
    badge: "limited",
    claims: [{ th: "สีแน่น ติดทน", en: "Rich pigment, lasting colour" }],
    rating: 4.7,
    reviewCount: 76,
    reviews: [
      { name: "คุณแพท", city: "กรุงเทพฯ", rating: 5, text: { th: "สีใช้ง่ายทุกสี ชิมเมอร์สวยมาก", en: "Every shade is wearable, the shimmer is stunning." } },
      { name: "คุณน้ำ", city: "สุราษฎร์ธานี", rating: 4, text: { th: "สีแน่นดี ทาตอนเช้าอยู่ถึงเย็น", en: "Great pigment, lasts from morning to evening." } },
    ],
    shades: [{ name: "Golden Hour", hex: "#c48a62", family: "brown" }],
  },
  {
    slug: "natural-flutter-lashes",
    name: "Natural Flutter Lashes",
    category: "lashes",
    kind: "lashes",
    tagline: { th: "ขนตาปลอมแบบธรรมชาติ น้ำหนักเบา ใส่สบาย", en: "Featherlight lashes for a natural flutter" },
    description: {
      th: "ขนตาปลอมเส้นบางเบา ก้านนิ่มโค้งตามรูปตา ให้ดวงตาดูหวานเป็นธรรมชาติ เหมาะกับการใส่ทุกวัน",
      en: "Fine, featherlight lashes on a soft band that follows the shape of your eye. A natural, everyday flutter.",
    },
    howTo: [
      { th: "วัดความยาวกับดวงตา แล้วตัดส่วนเกินจากหางตา", en: "Measure against your eye and trim from the outer end." },
      { th: "ทากาวบาง ๆ ที่ก้าน รอ 30 วินาที", en: "Apply a thin line of glue to the band and wait 30 seconds." },
      { th: "วางให้ชิดโคนขนตาจริง เริ่มจากกลางตา", en: "Place close to your lash line, starting in the middle." },
    ],
    price: 290,
    finish: "natural",
    features: [],
    claims: [reusable],
    rating: 4.6,
    reviewCount: 58,
    reviews: [
      { name: "คุณเมย์", city: "นนทบุรี", rating: 5, text: { th: "ใส่แล้วไม่หนักตา ดูธรรมชาติมาก", en: "Weightless and so natural." } },
      { name: "คุณจูน", city: "พิษณุโลก", rating: 4, text: { th: "ก้านนิ่ม ใส่ง่าย", en: "Soft band, easy to apply." } },
    ],
    shades: [{ name: "Natural", hex: "#2b1e22", family: "black" }],
  },
  {
    slug: "glam-volume-lashes",
    name: "Glam Volume Lashes",
    category: "lashes",
    kind: "lashes",
    tagline: { th: "ขนตาปลอมวอลลุ่ม สำหรับลุคออกงาน", en: "Full-volume lashes for evening looks" },
    description: {
      th: "ขนตาปลอมวอลลุ่มแบบหลายชั้น ให้ดวงตาดูโดดเด่นสำหรับงานเลี้ยงหรือถ่ายรูป ยังคงน้ำหนักเบา ใส่ได้ทั้งคืน",
      en: "Layered, full-volume lashes for parties and photos that stay light enough to wear all night.",
    },
    howTo: [
      { th: "วัดความยาวกับดวงตา แล้วตัดส่วนเกินจากหางตา", en: "Measure against your eye and trim from the outer end." },
      { th: "ทากาวบาง ๆ ที่ก้าน รอ 30 วินาที แล้ววางชิดโคนขนตา", en: "Apply a thin line of glue, wait 30 seconds, then place close to the lash line." },
    ],
    price: 320,
    finish: "natural",
    features: [],
    badge: "new",
    claims: [reusable],
    rating: 4.7,
    reviewCount: 41,
    reviews: [
      { name: "คุณแนน", city: "กรุงเทพฯ", rating: 5, text: { th: "ใส่ไปงานแต่งเพื่อน รูปออกมาสวยมาก", en: "Wore them to a friend's wedding, the photos look amazing." } },
      { name: "คุณบุ๋ม", city: "เชียงใหม่", rating: 4, text: { th: "หนาสวย น้ำหนักเบากว่าที่คิด", en: "Full and pretty, lighter than expected." } },
    ],
    shades: [{ name: "Glam", hex: "#1c1416", family: "black" }],
  },
  {
    slug: "signature-makeup-kit",
    name: "Signature Makeup Kit",
    category: "sets",
    kind: "set",
    tagline: { th: "เซ็ตแต่งหน้าครบลุค ลิป บลัช อายไลเนอร์ ในกล่องของขวัญ", en: "Lipstick, blush and liner in a gift box" },
    description: {
      th: "รวมไอเทมขายดีที่สุดของเราไว้ในกล่องเดียว: Velvet Kiss สี Rose Petal, Petal Soft Blush สี Sakura และ Precision Ink Eyeliner สี Jet Black ในกล่องของขวัญพร้อมการ์ดเขียนข้อความ",
      en: "Our three bestsellers in one box: Velvet Kiss in Rose Petal, Petal Soft Blush in Sakura and Precision Ink Eyeliner in Jet Black, gift-boxed with a message card.",
    },
    howTo: [
      { th: "เริ่มจากอายไลเนอร์ ตามด้วยบลัช แล้วจบด้วยลิปสติก", en: "Start with liner, then blush, and finish with lipstick." },
    ],
    price: 1290,
    finish: "natural",
    features: ["longWear"],
    badge: "limited",
    claims: [{ th: "พร้อมกล่องของขวัญ", en: "Gift-boxed" }, { th: "ประหยัดกว่าซื้อแยก ฿100", en: "Save ฿100 vs buying separately" }],
    rating: 4.9,
    reviewCount: 64,
    reviews: [
      { name: "คุณต้น", city: "กรุงเทพฯ", rating: 5, text: { th: "ซื้อเป็นของขวัญวันเกิดแฟน กล่องสวยมาก แฟนชอบครับ", en: "Bought it for my girlfriend's birthday. Beautiful box, she loved it." } },
      { name: "คุณอิง", city: "ขอนแก่น", rating: 5, text: { th: "คุ้มมาก ได้ครบทั้งลุค", en: "Great value, a complete look." } },
    ],
    shades: [{ name: "Rose Edition", hex: "#c97b84", family: "pink" }],
  },
];

// Attach packshot photos found in public/images/products/<slug>/<shade>.webp.
const withImages = (p: Product): Product => ({
  ...p,
  shades: p.shades.map((s) => ({ ...s, image: findImage(`products/${p.slug}/${toSlug(s.name)}`) })),
});

export async function getProducts(category?: CategorySlug): Promise<Product[]> {
  return (category ? products.filter((p) => p.category === category) : products).map(withImages);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const product = products.find((p) => p.slug === slug);
  return product && withImages(product);
}

export async function getBestsellers(): Promise<Product[]> {
  const featured = products.filter((p) => p.badge === "bestseller");
  return [...featured, ...products.filter((p) => !featured.includes(p))].slice(0, 8).map(withImages);
}

/** "Complete the look": up to 3 products from other categories, bestsellers first. */
export async function getCompleteTheLook(product: Product): Promise<Product[]> {
  const others = (await getBestsellers()).concat(await getProducts()).filter((p) => p.category !== product.category && p.category !== "sets");
  return [...new Map(others.map((p) => [p.category, p])).values()].slice(0, 3);
}

export const isCategory = (value: string): value is CategorySlug =>
  (categories as string[]).includes(value);
