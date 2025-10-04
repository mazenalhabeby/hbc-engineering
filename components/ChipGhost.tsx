export default function ChipGhost({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/60 px-3 py-1 text-sm text-slate-800 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
      {children}
    </span>
  );
}
