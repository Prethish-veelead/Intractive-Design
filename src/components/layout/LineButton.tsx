import { ChatCircleDots } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";

export function LineButton({ label }: { label: string }) {
  return (
    <a
      href={site.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="line-button fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-line text-white shadow-lift transition-transform duration-300 ease-press hover:-translate-y-0.5 active:scale-95"
    >
      <ChatCircleDots size={28} weight="fill" />
    </a>
  );
}
