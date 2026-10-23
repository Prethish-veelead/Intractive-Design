import { lang as rootLang } from "next/root-params";
import { getDictionary, hasLocale, defaultLocale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

export default async function NotFound() {
  const value = await rootLang();
  const lang = value && hasLocale(value) ? value : defaultLocale;
  const t = (await getDictionary(lang)).notFound;
  return (
    <Container className="flex min-h-[60dvh] flex-col items-center justify-center py-24 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 font-display text-5xl text-rosewood md:text-6xl">{t.title}</h1>
      <p className="mt-5 max-w-md text-ink/70">{t.text}</p>
      <div className="mt-10">
        <ButtonLink href={`/${lang}`}>{t.cta}</ButtonLink>
      </div>
    </Container>
  );
}
