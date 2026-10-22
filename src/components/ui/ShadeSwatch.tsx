type Size = "sm" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  lg: "h-9 w-9",
};

/** Round shade dot. When `selected` is set, a ring marks the active shade. */
export function ShadeSwatch({ hex, size = "sm", selected = false }: { hex: string; size?: Size; selected?: boolean }) {
  return (
    <span
      className={`block rounded-full ring-offset-2 ring-offset-ivory transition-[box-shadow,transform] duration-300 ease-silk ${sizes[size]} ${selected ? "scale-110 ring-1 ring-rosewood" : "ring-0"}`}
      style={{ backgroundColor: hex, boxShadow: "inset 0 1px 2px rgb(255 255 255 / 0.35), inset 0 -2px 4px rgb(0 0 0 / 0.12)" }}
    />
  );
}
