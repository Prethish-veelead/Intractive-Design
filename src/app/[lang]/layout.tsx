import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Sans_Thai, Trirong } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LineButton } from "@/components/layout/LineButton";
import "../globals.css";

// Latin and Thai faces are chained per role; the browser picks per character.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant" });
const trirong = Trirong({ subsets: ["thai"], weight: ["300", "400"], variable: "--font-trirong" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans", adjustFontFallback: false });
const plexThai = IBM_Plex_Sans_Thai({ subsets: ["thai"], weight: ["400", "500"], variable: "--font-plex-thai" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { default: `${site.brand} · ${dict.meta.title}`, template: `%s · ${site.brand}` },
    description: dict.meta.description,
    alternates: { languages: { th: "/th", en: "/en" } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${cormorant.variable} ${trirong.variable} ${dmSans.variable} ${plexThai.variable}`}>
      <body className="flex min-h-[100dvh] flex-col">
        <AnnouncementBar text={dict.announcement} />
        <Header lang={lang} nav={dict.nav} categories={dict.categories} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <LineButton label={dict.line.chat} />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
