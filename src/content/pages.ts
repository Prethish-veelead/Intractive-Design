import type { Localized } from "@/lib/catalog";

// Long-form page content. Thai copy is a draft pending native review (task-plan 3.12).
// Pages marked `draft` show a visible notice: their policies need the owner's (help) or a
// lawyer's (legal) approval before launch (task-plan 3.11).

export type Faq = { q: Localized; a: Localized };
export type PageSection = { id?: string; heading: Localized; paragraphs: Localized[]; faqs?: Faq[] };
export type ContentPage = {
  slug: string;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  draft?: "owner" | "legal";
  sections: PageSection[];
};

const about: ContentPage = {
  slug: "about",
  eyebrow: { th: "เรื่องราวของเรา", en: "Our story" },
  // U+2060 word joiner keeps "เพื่อคุณ" together so "คุณ" never sits alone on the last line.
  title: { th: "ความงามที่ออกแบบมาเพื่อ\u2060คุณ", en: "Beauty designed around you" },
  intro: {
    th: "เราเริ่มต้นจากคำถามง่าย ๆ ว่า ทำไมเครื่องสำอางส่วนใหญ่ถึงไม่ได้ออกแบบมาเพื่อผิวและอากาศของเมืองไทย",
    en: "We started with a simple question: why is so little makeup designed for Thai skin and Thai weather?",
  },
  sections: [
    {
      heading: { th: "ทดสอบบนผิวสาวไทยทุกโทน", en: "Tested on every Thai skin tone" },
      paragraphs: [
        {
          th: "ทุกเฉดสีของเราถูกทดสอบบนผิวหลากหลายโทน ตั้งแต่ผิวขาว ผิวสองสี ไปจนถึงผิวแทน เพราะเราเชื่อว่าไม่มีสีผิวไหนที่ \"ดีกว่า\" สีผิวไหน",
          en: "Every shade is tested on a range of skin tones, from fair to medium to tan, because no skin tone is \"better\" than another.",
        },
      ],
    },
    {
      heading: { th: "สูตรที่ทนอากาศร้อนชื้น", en: "Formulas made for heat and humidity" },
      paragraphs: [
        {
          th: "เราทดสอบสูตรในสภาพอากาศร้อนชื้นจริง ทั้งบนรถไฟฟ้าตอนเช้า ในออฟฟิศ และกลางแดดตอนเที่ยง เพื่อให้เมคอัพอยู่กับคุณได้ตลอดวัน",
          en: "We test our formulas in real heat and humidity, on the morning train, in the office and in the midday sun, so your makeup stays with you all day.",
        },
      ],
    },
    {
      heading: { th: "ซื่อสัตย์ในทุกคำ", en: "Honest in every word" },
      paragraphs: [
        {
          th: "เราบอกส่วนผสมครบทุกตัว แสดงเลขที่ใบรับจดแจ้ง อย. ทุกชิ้น และจะไม่สัญญาสิ่งที่เครื่องสำอางทำไม่ได้ค่ะ",
          en: "We list every ingredient, show the Thai FDA notification number on every product, and never promise what makeup can't do.",
        },
      ],
    },
  ],
};

const help: ContentPage = {
  slug: "help",
  eyebrow: { th: "ช่วยเหลือ", en: "Help" },
  title: { th: "เราพร้อมช่วยเหลือค่ะ", en: "We're here to help" },
  intro: {
    th: "คำตอบเรื่องการจัดส่ง การคืนสินค้า และการชำระเงิน หากไม่พบคำตอบ ทักหาเราทาง LINE ได้ทุกวันค่ะ",
    en: "Answers about delivery, returns and payment. Can't find what you need? Message us on LINE any day.",
  },
  draft: "owner",
  sections: [
    {
      id: "shipping",
      heading: { th: "การจัดส่ง", en: "Delivery" },
      paragraphs: [
        { th: "จัดส่งทั่วประเทศภายใน 1–3 วันทำการ ส่งฟรีเมื่อช้อปครบ ฿590 ค่าจัดส่งสำหรับคำสั่งซื้อที่ต่ำกว่าจะแสดงที่หน้าชำระเงิน", en: "We deliver across Thailand in 1–3 working days. Delivery is free from ฿590; for smaller orders the fee is shown at checkout." },
        { th: "เมื่อจัดส่งแล้ว คุณจะได้รับเลขพัสดุทางอีเมลและ LINE (หากเพิ่มเพื่อนไว้)", en: "Once shipped, you'll get a tracking number by email and on LINE (if you've added us)." },
      ],
    },
    {
      id: "returns",
      heading: { th: "การคืนสินค้า", en: "Returns" },
      paragraphs: [
        { th: "หากได้รับสินค้าชำรุดหรือไม่ถูกต้อง แจ้งเราภายใน 7 วันหลังได้รับสินค้า พร้อมรูปถ่าย เราจะเปลี่ยนสินค้าหรือคืนเงินให้ค่ะ", en: "If an item arrives damaged or wrong, tell us within 7 days of delivery with a photo and we'll replace it or refund you." },
        { th: "ด้วยเหตุผลด้านสุขอนามัย เราไม่สามารถรับคืนสินค้าที่เปิดใช้แล้ว ยกเว้นกรณีแพ้หรือระคายเคือง", en: "For hygiene reasons we can't accept opened products, except in case of an allergic reaction or irritation." },
      ],
    },
    {
      id: "payment",
      heading: { th: "วิธีชำระเงิน", en: "Payment methods" },
      paragraphs: [
        { th: "ชำระได้ผ่าน PromptPay QR, TrueMoney Wallet, Rabbit LINE Pay และบัตรเครดิต/เดบิต Visa และ Mastercard ข้อมูลบัตรของคุณจะไม่ถูกเก็บไว้ในระบบของเรา", en: "Pay with PromptPay QR, TrueMoney Wallet, Rabbit LINE Pay, or Visa and Mastercard credit/debit cards. Your card details are never stored on our systems." },
      ],
    },
    {
      id: "faq",
      heading: { th: "คำถามที่พบบ่อย", en: "Frequently asked questions" },
      paragraphs: [],
      faqs: [
        {
          q: { th: "จะเลือกเฉดคุชชั่นให้ตรงกับผิวได้อย่างไร", en: "How do I find my cushion shade?" },
          a: { th: "ลองใช้หน้าค้นหาเฉดสีของเรา หรือส่งรูปหน้าในแสงธรรมชาติมาทาง LINE ทีมของเราจะช่วยแนะนำค่ะ", en: "Try our shade finder, or send us a photo in daylight on LINE and our team will help." },
        },
        {
          q: { th: "สินค้ามีเลข อย. หรือไม่", en: "Are your products registered with the Thai FDA?" },
          a: { th: "สินค้าทุกชิ้นต้องผ่านการจดแจ้งกับ อย. ก่อนวางจำหน่าย และเราแสดงเลขที่ใบรับจดแจ้งไว้ในหน้าสินค้าค่ะ", en: "Every product is notified with the Thai FDA before sale, and the notification number is shown on each product page." },
        },
        {
          q: { th: "เก็บเงินปลายทางได้ไหม", en: "Can I pay cash on delivery?" },
          a: { th: "ขณะนี้ยังอยู่ระหว่างพิจารณาค่ะ", en: "We're still deciding on this." },
        },
        {
          q: { th: "ห่อของขวัญได้ไหม", en: "Do you offer gift wrapping?" },
          a: { th: "ได้ค่ะ เลือกห่อของขวัญและเขียนการ์ดข้อความได้ที่หน้าชำระเงิน", en: "Yes, choose gift wrapping and add a message card at checkout." },
        },
      ],
    },
  ],
};

const legalIntro: Localized = {
  th: "ฉบับร่างเพื่อการออกแบบเว็บไซต์ ต้องได้รับการตรวจสอบโดยนักกฎหมายก่อนเปิดใช้งานจริง",
  en: "Draft for website design. Must be reviewed by a lawyer before going live.",
};

const privacy: ContentPage = {
  slug: "privacy",
  eyebrow: { th: "กฎหมาย", en: "Legal" },
  title: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy policy" },
  intro: legalIntro,
  draft: "legal",
  sections: [
    {
      heading: { th: "ข้อมูลที่เราเก็บ", en: "What we collect" },
      paragraphs: [{ th: "ชื่อ ที่อยู่จัดส่ง เบอร์โทรศัพท์ อีเมล และประวัติการสั่งซื้อ เพื่อใช้ในการจัดส่งและบริการลูกค้า ข้อมูลการชำระเงินดำเนินการโดยผู้ให้บริการชำระเงิน", en: "Name, delivery address, phone, email and order history, used for delivery and customer service. Payments are processed by our payment provider." }],
    },
    {
      heading: { th: "สิทธิ์ของคุณตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)", en: "Your rights under the PDPA" },
      paragraphs: [{ th: "คุณมีสิทธิ์ขอเข้าถึง แก้ไข ลบ หรือถอนความยินยอมเกี่ยวกับข้อมูลส่วนบุคคลของคุณได้ทุกเมื่อ โดยติดต่อเราผ่านช่องทางในหน้าติดต่อเรา", en: "You can ask to access, correct or delete your personal data, or withdraw consent, at any time through our contact page." }],
    },
    {
      heading: { th: "การตลาด", en: "Marketing" },
      paragraphs: [{ th: "เราจะส่งข่าวสารและโปรโมชันเฉพาะเมื่อคุณให้ความยินยอมเท่านั้น และคุณยกเลิกได้ทุกเมื่อ", en: "We only send news and offers if you opt in, and you can unsubscribe at any time." }],
    },
  ],
};

const terms: ContentPage = {
  slug: "terms",
  eyebrow: { th: "กฎหมาย", en: "Legal" },
  title: { th: "ข้อกำหนดการใช้งาน", en: "Terms of use" },
  intro: legalIntro,
  draft: "legal",
  sections: [
    {
      heading: { th: "การสั่งซื้อ", en: "Orders" },
      paragraphs: [{ th: "คำสั่งซื้อจะสมบูรณ์เมื่อชำระเงินเรียบร้อย ราคาสินค้าแสดงเป็นเงินบาทและรวมภาษีมูลค่าเพิ่มแล้ว", en: "An order is confirmed once payment is complete. Prices are in Thai baht and include VAT." }],
    },
    {
      heading: { th: "สีของสินค้า", en: "Product colours" },
      paragraphs: [{ th: "สีที่แสดงบนหน้าจออาจแตกต่างจากสีจริงเล็กน้อย ขึ้นอยู่กับการตั้งค่าหน้าจอของคุณ", en: "Colours on screen may differ slightly from the real product depending on your display." }],
    },
  ],
};

const cookies: ContentPage = {
  slug: "cookies",
  eyebrow: { th: "กฎหมาย", en: "Legal" },
  title: { th: "การตั้งค่าคุกกี้", en: "Cookie settings" },
  intro: legalIntro,
  draft: "legal",
  sections: [
    {
      heading: { th: "คุกกี้ที่จำเป็น", en: "Necessary cookies" },
      paragraphs: [{ th: "ใช้เพื่อให้ตะกร้าสินค้าและการชำระเงินทำงานได้ ไม่สามารถปิดได้", en: "Keep your bag and checkout working. These can't be switched off." }],
    },
    {
      heading: { th: "คุกกี้วิเคราะห์และการตลาด", en: "Analytics and marketing cookies" },
      paragraphs: [{ th: "ใช้เมื่อคุณยินยอมเท่านั้น เพื่อช่วยให้เราปรับปรุงเว็บไซต์และแสดงโฆษณาที่เกี่ยวข้อง คุณเปลี่ยนการตั้งค่าได้ทุกเมื่อ", en: "Used only with your consent, to improve the site and show relevant ads. You can change your choice at any time." }],
    },
  ],
};

export const contentPages = { about, help, privacy, terms, cookies } as const;
export type ContentSlug = keyof typeof contentPages;
