import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/journal";
import type { Dictionary, Locale } from "@/lib/i18n";
import { findImage } from "@/lib/images";

/** Article cover photo if one exists, otherwise the placeholder gradient. Fills its parent. */
export function JournalCover({ article, sizes, priority = false }: { article: Article; sizes: string; priority?: boolean }) {
  const photo = findImage(`journal/${article.slug}`);
  return photo ? (
    <Image src={photo} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
  ) : (
    <div className={`absolute inset-0 bg-gradient-to-br ${article.cover}`} />
  );
}

export function JournalCard({ article, lang, dict }: { article: Article; lang: Locale; dict: Dictionary }) {
  return (
    <Link href={`/${lang}/journal/${article.slug}`} className="group block">
      <div className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card-inner transition-transform duration-700 ease-silk group-hover:scale-[0.98]">
          <JournalCover article={article} sizes="(min-width: 768px) 33vw, 92vw" />
        </div>
      </div>
      <p className="eyebrow mt-5 text-[10px] text-rose">
        {article.tag[lang]} · {article.minutes} {dict.journal.minutes}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-rosewood">{article.title[lang]}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-ink/60">{article.excerpt[lang]}</p>
    </Link>
  );
}
