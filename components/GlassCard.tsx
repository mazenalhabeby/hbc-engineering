import Image from "next/image";
import * as React from "react";

type GlassCardProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  onLoaded?: () => void;
};

export default function GlassCard({
  src,
  alt = "",
  priority,
  className,
  onLoaded,
}: GlassCardProps) {
  return (
    <div
      className={`relative h-full w-full rounded-3xl bg-white/70 shadow-xl backdrop-blur ${
        className ?? ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover rounded-3xl"
        onLoadingComplete={() => onLoaded?.()}
      />
    </div>
  );
}
