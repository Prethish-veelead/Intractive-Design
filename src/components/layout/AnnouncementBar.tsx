export function AnnouncementBar({ text }: { text: string }) {
  return (
    <p className="bg-rosewood px-4 py-2 text-center text-[12px] tracking-wide text-ivory/90">
      {text}
    </p>
  );
}
