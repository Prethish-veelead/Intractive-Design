import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatCircleDots, Envelope, MessengerLogo, Phone } from "@phosphor-icons/react/ssr";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: (await getDictionary(lang)).contact.eyebrow };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).contact;

  const channels = [
    { icon: ChatCircleDots, title: t.line, text: t.lineText, href: site.lineUrl, value: t.open, accent: "bg-line text-white" },
    { icon: MessengerLogo, title: t.facebook, text: t.facebookText, href: site.facebookUrl, value: t.open, accent: "bg-blush text-rosewood" },
    { icon: Envelope, title: t.email, text: t.emailText, href: `mailto:${site.email}`, value: site.email, accent: "bg-blush text-rosewood" },
    { icon: Phone, title: t.phone, text: t.phoneText, href: `tel:${site.phone}`, value: site.phone, accent: "bg-blush text-rosewood" },
  ];

  return (
    <Container className="pb-24 pt-14 md:pt-20">
      <header data-reveal className="max-w-2xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-5xl text-rosewood md:text-7xl">{t.title}</h1>
        <p className="mt-6 text-lg text-ink/70">{t.intro}</p>
      </header>
      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {channels.map(({ icon: Icon, ...c }) => (
          <li key={c.title} data-reveal>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex h-full gap-5 rounded-card bg-white/50 p-6 ring-1 ring-rosewood/5 transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-1 hover:shadow-lift md:p-8"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${c.accent}`}>
                <Icon size={24} weight="light" />
              </span>
              <span>
                <span className="block font-display text-2xl text-rosewood">{c.title}</span>
                <span className="mt-1 block text-sm text-ink/70">{c.text}</span>
                <span className="mt-3 block text-sm font-medium text-ink">{c.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
