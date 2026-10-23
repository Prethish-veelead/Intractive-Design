// Placeholder "photos" of a shade until real swatch and texture shots exist (task-plan 3.4).

/** Brush-stroke swatch; multiply lets the background skin tone show through like real pigment. */
export function SwatchStroke({ hex, className = "" }: { hex: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 180" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path
        d="M28 112 C 70 70, 130 64, 180 78 S 270 98, 296 70 L 300 92 C 268 126, 210 118, 170 108 S 80 104, 34 138 Z"
        fill={hex}
        opacity="0.92"
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}

/** Close-up of the product texture: a soft dome of colour with a highlight. */
export function TextureView({ hex, className = "" }: { hex: string; className?: string }) {
  const id = `tex-${hex.slice(1)}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.35" stopColor={hex} />
          <stop offset="1" stopColor={hex} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="78" fill={`url(#${id})`} />
      <ellipse cx="78" cy="70" rx="22" ry="10" fill="#fff" opacity="0.35" transform="rotate(-25 78 70)" />
    </svg>
  );
}
