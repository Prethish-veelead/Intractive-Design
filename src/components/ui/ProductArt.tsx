import type { ProductKind } from "@/lib/catalog";

// Placeholder product illustrations until the photoshoot (task-plan 3.4).
// Each kind is a simple SVG drawn in the product's shade color.

const gold = "#c9a66b";
const shell = "#2b1e22";

export function ProductArt({ kind, color, className = "" }: { kind: ProductKind; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 250" className={className} role="presentation" aria-hidden>
      <ellipse cx="100" cy="226" rx="56" ry="7" fill="#5a2a35" opacity="0.08" />
      {shapes[kind](color)}
    </svg>
  );
}

const shapes: Record<ProductKind, (c: string) => React.ReactNode> = {
  lipstick: (c) => (
    <g>
      <rect x="76" y="140" width="48" height="84" rx="4" fill={shell} />
      <rect x="76" y="132" width="48" height="12" rx="2" fill={gold} />
      <rect x="82" y="100" width="36" height="34" fill={c} opacity="0.85" />
      <path d="M82 100 L82 64 Q82 52 100 44 L118 58 L118 100 Z" fill={c} />
      <path d="M88 98 L88 66 Q88 58 96 54" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  tint: (c) => (
    <g>
      <rect x="84" y="40" width="32" height="44" rx="6" fill={shell} />
      <rect x="80" y="84" width="40" height="140" rx="10" fill={c} opacity="0.9" />
      <rect x="86" y="92" width="6" height="120" rx="3" fill="#fff" opacity="0.35" />
      <rect x="80" y="84" width="40" height="6" fill={gold} />
    </g>
  ),
  cushion: (c) => (
    <g>
      <ellipse cx="100" cy="176" rx="74" ry="40" fill={shell} />
      <ellipse cx="100" cy="166" rx="74" ry="40" fill="#3a2a2f" />
      <ellipse cx="100" cy="164" rx="62" ry="32" fill={c} />
      <ellipse cx="100" cy="110" rx="74" ry="40" fill="#3a2a2f" />
      <ellipse cx="100" cy="106" rx="60" ry="30" fill={gold} opacity="0.35" />
      <ellipse cx="80" cy="156" rx="18" ry="6" fill="#fff" opacity="0.3" />
    </g>
  ),
  blush: (c) => (
    <g>
      <circle cx="100" cy="140" r="72" fill={shell} />
      <circle cx="100" cy="140" r="60" fill={c} />
      <path d="M70 120 Q100 100 130 120" stroke="#fff" strokeOpacity="0.3" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="140" r="72" fill="none" stroke={gold} strokeWidth="2" />
    </g>
  ),
  powder: (c) => (
    <g>
      <rect x="44" y="96" width="112" height="22" rx="8" fill={shell} />
      <rect x="40" y="118" width="120" height="96" rx="14" fill="#f8efe9" stroke="#e4c3b5" />
      <ellipse cx="100" cy="128" rx="52" ry="10" fill={c} />
      <rect x="40" y="150" width="120" height="6" fill={gold} opacity="0.5" />
    </g>
  ),
  eyeliner: (c) => (
    <g transform="rotate(-18 100 130)">
      <rect x="92" y="30" width="16" height="140" rx="6" fill={shell} />
      <rect x="92" y="150" width="16" height="6" fill={gold} />
      <path d="M94 170 L106 170 L100 222 Z" fill={c} />
    </g>
  ),
  mascara: (c) => (
    <g transform="rotate(14 100 130)">
      <rect x="86" y="30" width="28" height="92" rx="8" fill={shell} />
      <rect x="86" y="118" width="28" height="6" fill={gold} />
      <rect x="88" y="124" width="24" height="96" rx="10" fill={c} />
      <rect x="93" y="134" width="5" height="76" rx="2.5" fill="#fff" opacity="0.2" />
    </g>
  ),
  palette: (c) => (
    <g>
      <rect x="30" y="70" width="140" height="140" rx="14" fill={shell} />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <circle key={`${row}${col}`} cx={62 + col * 38} cy={102 + row * 38} r="15" fill={c} opacity={0.45 + (row * 3 + col) * 0.065} />
        )),
      )}
      <rect x="30" y="70" width="140" height="140" rx="14" fill="none" stroke={gold} strokeWidth="2" />
    </g>
  ),
  lashes: (c) => (
    <g stroke={c} strokeWidth="2.2" strokeLinecap="round" fill="none">
      <path d="M40 150 Q100 118 160 150" strokeWidth="4" />
      {Array.from({ length: 19 }, (_, i) => {
        const t = i / 18;
        const x = 40 + t * 120;
        const y = 150 - Math.sin(t * Math.PI) * 24;
        const len = 26 + Math.sin(t * Math.PI) * 30;
        const lean = (t - 0.5) * 30;
        return <path key={i} d={`M${x} ${y} Q${x + lean * 0.4} ${y - len * 0.6} ${x + lean} ${y - len}`} />;
      })}
    </g>
  ),
  set: (c) => (
    <g>
      <rect x="34" y="96" width="132" height="118" rx="10" fill={c} />
      <rect x="34" y="96" width="132" height="26" rx="6" fill={c} opacity="0.85" />
      <rect x="92" y="96" width="16" height="118" fill={gold} />
      <path d="M100 96 C80 70 60 82 76 96 M100 96 C120 70 140 82 124 96" stroke={gold} strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  ),
};
