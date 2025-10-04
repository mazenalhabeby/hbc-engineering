import Image from "next/image";

export default function GlassCard({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[32px] bg-white/50 shadow-[0_30px_80px_-20px_rgba(6,110,176,0.25)] ring-1 ring-black/5">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 560px"
        className="object-cover"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_160px_at_0%_0%,rgba(255,255,255,0.5),transparent_60%)]" />
    </div>
  );
}
