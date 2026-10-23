import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentPages, type ContentSlug } from "@/content/pages";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { ContentPageView } from "@/components/sections/ContentPageView";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

// About, Help and the legal pages share one editorial layout.
const isContentSlug = (value: string): value is ContentSlug => value in contentPages;

export function generateStaticParams() {
  return Object.keys(contentPages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[page]">): Promise<Metadata> {
  const { lang, page } = await params;
  if (!hasLocale(lang) || !isContentSlug(page)) return {};
  return { title: contentPages[page].title[lang], description: contentPages[page].intro[lang] };
}

export default async function Page({ params }: PageProps<"/[lang]/[page]">) {
  const { lang, page } = await params;
  if (!hasLocale(lang) || !isContentSlug(page)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      {page === "about" && <SmoothScroll />}
      <ContentPageView page={contentPages[page]} lang={lang} dict={dict} />
    </>
  );
}
