import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShadeFinderTeaser } from "@/components/sections/ShadeFinderTeaser";
import { BrandStory } from "@/components/sections/BrandStory";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { Reviews } from "@/components/sections/Reviews";
import { LineSignup } from "@/components/sections/LineSignup";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <CategoryGrid lang={lang} dict={dict} />
      <Bestsellers lang={lang} dict={dict} />
      <ShadeFinderTeaser lang={lang} dict={dict} />
      <BrandStory lang={lang} dict={dict} />
      <JournalPreview lang={lang} dict={dict} />
      <Reviews dict={dict} />
      <LineSignup dict={dict} />
    </>
  );
}
