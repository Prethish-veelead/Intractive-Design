import type { Localized } from "@/lib/catalog";

// Beauty journal articles. Thai copy is a draft pending native review (task-plan 3.12).

export type Article = {
  slug: string;
  title: Localized;
  tag: Localized;
  excerpt: Localized;
  minutes: number;
  /** Placeholder cover until photography exists (task-plan 3.4). */
  cover: string;
  sections: { heading: Localized; paragraphs: Localized[] }[];
  /** Products the article links to ("shop the look"). */
  products: string[];
};

export const articles: Article[] = [
  {
    slug: "songkran-waterproof-look",
    title: { th: "ลุคสงกรานต์กันน้ำ สวยทั้งวัน", en: "A waterproof Songkran look that lasts all day" },
    tag: { th: "ฮาวทู", en: "How-to" },
    excerpt: {
      th: "สาดน้ำได้เต็มที่โดยไม่ต้องห่วงหน้า กับ 4 ขั้นตอนแต่งหน้าที่ทนทั้งน้ำและแดด",
      en: "Splash all day without worrying about your face: four steps to makeup that survives water and sun.",
    },
    minutes: 4,
    cover: "from-[#cfe3ea] to-[#e9c9c3]",
    products: ["skin-silk-cushion", "precision-ink-eyeliner", "lift-curl-mascara", "dewy-glow-lip-tint"],
    sections: [
      {
        heading: { th: "1. เริ่มจากผิวที่บางเบา", en: "1. Start with light skin" },
        paragraphs: [
          {
            th: "ยิ่งเนื้อบาง ยิ่งติดทนเมื่อโดนน้ำ ใช้คุชชั่น SPF50+ ตบบาง ๆ เฉพาะจุดที่ต้องการ แล้วกดแป้งฝุ่นคุมมันที่ T-zone เพื่อล็อกเมคอัพ",
            en: "The thinner the base, the better it lasts in water. Pat on a thin layer of SPF50+ cushion only where you need it, then press oil-control powder onto the T-zone to lock it in.",
          },
        ],
      },
      {
        heading: { th: "2. อายไลเนอร์และมาสคาร่ากันน้ำ", en: "2. Waterproof liner and mascara" },
        paragraphs: [
          {
            th: "เลือกอายไลเนอร์แบบลิควิดที่แห้งเร็ว ปล่อยให้แห้งสนิท 30 วินาทีก่อนลืมตา แล้วปัดมาสคาร่ากันน้ำเพียงชั้นเดียว ชั้นเดียวบาง ๆ ติดทนกว่าการทาหลายชั้น",
            en: "Choose a quick-dry liquid liner and let it set for 30 seconds before opening your eyes. One thin coat of waterproof mascara lasts longer than several thick ones.",
          },
        ],
      },
      {
        heading: { th: "3. ทินต์แทนลิปสติก", en: "3. Tint instead of lipstick" },
        paragraphs: [
          {
            th: "ลิปทินต์จะทิ้งสีไว้บนริมฝีปากแม้วาวจะหลุดไปแล้ว แตะกลางปาก เม้มเบา ๆ แล้วพกติดตัวไว้เติมระหว่างวัน",
            en: "A tint leaves colour behind even after the shine is gone. Dab it on the centre of your lips, press together, and keep it with you for touch-ups.",
          },
        ],
      },
      {
        heading: { th: "4. ล้างออกอย่างอ่อนโยน", en: "4. Remove gently" },
        paragraphs: [
          {
            th: "เมคอัพกันน้ำต้องใช้คลีนซิ่งออยล์หรือบาล์ม วางสำลีชุบคลีนซิ่งไว้บนตา 10 วินาทีก่อนเช็ด เพื่อไม่ให้ขนตาหลุดค่ะ",
            en: "Waterproof makeup needs a cleansing oil or balm. Rest a soaked cotton pad on your eyes for 10 seconds before wiping so you don't pull out lashes.",
          },
        ],
      },
    ],
  },
  {
    slug: "lip-shade-for-your-undertone",
    title: { th: "เลือกเฉดลิปให้เข้ากับอันเดอร์โทน", en: "Choosing a lip shade for your undertone" },
    tag: { th: "เคล็ดลับ", en: "Tips" },
    excerpt: {
      th: "รู้อันเดอร์โทนของตัวเองใน 1 นาที แล้วเลือกลิปที่ทำให้หน้าดูสดใสขึ้นทันที",
      en: "Find your undertone in a minute, then pick lip colours that instantly brighten your face.",
    },
    minutes: 3,
    cover: "from-[#f1d3cf] to-[#c97b84]",
    products: ["velvet-kiss-matte-lipstick", "satin-bloom-lipstick", "dewy-glow-lip-tint"],
    sections: [
      {
        heading: { th: "อันเดอร์โทนคืออะไร", en: "What is an undertone?" },
        paragraphs: [
          {
            th: "อันเดอร์โทนคือโทนสีที่อยู่ใต้ผิว แยกจากความขาวหรือเข้มของผิว ผิวสาวไทยส่วนใหญ่เป็นโทนอุ่นหรือกลาง แต่ก็มีโทนเย็นไม่น้อยเลยค่ะ",
            en: "Your undertone is the colour beneath your skin, separate from how light or deep it is. Most Thai skin is warm or neutral, but plenty of us are cool.",
          },
        ],
      },
      {
        heading: { th: "ทดสอบง่าย ๆ", en: "A quick test" },
        paragraphs: [
          {
            th: "ดูเส้นเลือดที่ข้อมือในแสงธรรมชาติ ถ้าออกเขียว คุณน่าจะเป็นโทนอุ่น ถ้าออกม่วงหรือน้ำเงิน เป็นโทนเย็น ถ้าดูไม่ออก คุณอาจเป็นโทนกลาง อีกวิธีคือดูว่าเครื่องประดับทองหรือเงินทำให้หน้าดูสดใสกว่ากัน",
            en: "Look at the veins on your wrist in daylight. Greenish means warm, purple or blue means cool, and if you can't tell, you're probably neutral. Or notice whether gold or silver jewellery makes your face look brighter.",
          },
        ],
      },
      {
        heading: { th: "เฉดที่แนะนำ", en: "Shades to try" },
        paragraphs: [
          { th: "โทนอุ่น: Thai Tea, Chili Red, Cinnamon, Mango Rose — สีส้มอิฐ แดงอมส้ม และน้ำตาลอุ่น", en: "Warm: Thai Tea, Chili Red, Cinnamon, Mango Rose: brick, orange-reds and warm browns." },
          { th: "โทนเย็น: Mulberry, Rose Petal, Plum Wine, Orchid — สีเบอร์รี่ ชมพูกุหลาบ และม่วงพลัม", en: "Cool: Mulberry, Rose Petal, Plum Wine, Orchid: berries, rose pinks and plums." },
          { th: "โทนกลาง: Nude Silk, Lotus, Watermelon — ใส่ได้เกือบทุกสี ลองเริ่มจากนู้ดอมชมพู", en: "Neutral: Nude Silk, Lotus, Watermelon. Almost everything works, so start with a pinky nude." },
        ],
      },
    ],
  },
  {
    slug: "easy-winged-liner",
    title: { th: "กรีดอายไลเนอร์ง่าย ๆ ใน 3 ขั้นตอน", en: "An easy winged liner in three steps" },
    tag: { th: "ฮาวทู", en: "How-to" },
    excerpt: {
      th: "ไม่ต้องมือนิ่งก็กรีดหางตาได้สวยเท่ากันทั้งสองข้าง ด้วยเทคนิคจุดต่อจุด",
      en: "You don't need a steady hand for an even wing on both eyes. Just join the dots.",
    },
    minutes: 3,
    cover: "from-[#efe2d6] to-[#c9a66b]",
    products: ["precision-ink-eyeliner", "lift-curl-mascara", "natural-flutter-lashes"],
    sections: [
      {
        heading: { th: "1. วางจุดหางตา", en: "1. Mark the tip" },
        paragraphs: [
          {
            th: "มองตรงไปข้างหน้า แล้ววางจุดเล็ก ๆ ตามแนวที่ลากจากปีกจมูกผ่านหางตา ทำทั้งสองข้างก่อน แล้วเทียบให้สูงเท่ากัน",
            en: "Look straight ahead and place a small dot on the line from the side of your nose through the outer corner of your eye. Do both eyes first and check they're level.",
          },
        ],
      },
      {
        heading: { th: "2. ลากเส้นจากจุดเข้าหาตา", en: "2. Draw back towards the eye" },
        paragraphs: [
          {
            th: "ลากเส้นจากจุดกลับมาที่กลางเปลือกตาด้านบน จะได้หางตาทรงสามเหลี่ยมที่คมเท่ากันทั้งสองข้าง",
            en: "Draw a line from the dot back to the middle of your upper lid. You'll get a sharp, matching triangle on both sides.",
          },
        ],
      },
      {
        heading: { th: "3. เติมช่องว่างและเก็บเส้น", en: "3. Fill in and tidy up" },
        paragraphs: [
          {
            th: "เติมเส้นให้ชิดโคนขนตา แล้วใช้คอตตอนบัดชุบคลีนซิ่งเก็บขอบหางตาให้คมยิ่งขึ้น จบด้วยมาสคาร่าหนึ่งชั้นค่ะ",
            en: "Fill in along the lash line, then sharpen the edge of the wing with a cotton bud and a little cleanser. Finish with one coat of mascara.",
          },
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
