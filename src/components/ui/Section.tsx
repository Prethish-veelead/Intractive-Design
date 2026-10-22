export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 md:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-block rounded-full bg-blush/70 px-3 py-1 text-[10px] font-medium text-rosewood">
      {children}
    </span>
  );
}

/** Section heading: eyebrow pill above a large serif title, optional action on the right. */
export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col items-start gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl text-rosewood md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
