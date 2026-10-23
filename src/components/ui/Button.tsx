import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

type Variant = "primary" | "secondary";

const styles: Record<Variant, { shell: string; icon: string }> = {
  primary: { shell: "bg-rosewood text-ivory hover:bg-rosewood-deep", icon: "bg-ivory/15" },
  secondary: { shell: "bg-ivory/60 text-rosewood ring-1 ring-rosewood/20 hover:bg-blush/60", icon: "bg-rosewood/10" },
};

/** Pill link with the arrow nested in its own circle (button-in-button). */
export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: Variant }) {
  const s = styles[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium transition-[background-color,transform] duration-500 ease-press active:scale-[0.98] ${s.shell}`}
    >
      {children}
      <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-press group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 ${s.icon}`}>
        <ArrowUpRight size={16} weight="light" />
      </span>
    </Link>
  );
}
