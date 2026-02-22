import React from "react";
import { cn } from "@/lib/utils";

const blobBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  WebkitFilter: "blur(80px)",
  filter: "blur(80px)",
  opacity: 0.7,
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  willChange: "transform",
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
};

const blobs: { style: React.CSSProperties; animation: string }[] = [
  {
    style: {
      width: "60%",
      height: "70%",
      top: "-20%",
      left: "-15%",
      background: "radial-gradient(circle, #3b82f6 0%, #60a5fa 40%, transparent 70%)",
    },
    animation: "aurora-drift-1 8s ease-in-out infinite alternate",
  },
  {
    style: {
      width: "55%",
      height: "60%",
      top: "15%",
      right: "-12%",
      background: "radial-gradient(circle, #22d3ee 0%, #67e8f9 40%, transparent 70%)",
    },
    animation: "aurora-drift-2 10s ease-in-out infinite alternate",
  },
  {
    style: {
      width: "50%",
      height: "55%",
      bottom: "-15%",
      left: "20%",
      background: "radial-gradient(circle, #a78bfa 0%, #c4b5fd 40%, transparent 70%)",
    },
    animation: "aurora-drift-3 9s ease-in-out infinite alternate",
  },
  {
    style: {
      width: "35%",
      height: "40%",
      top: "40%",
      left: "10%",
      background: "radial-gradient(circle, #818cf8 0%, #6366f1 35%, transparent 70%)",
      opacity: 0.5,
    },
    animation: "aurora-drift-4 7s ease-in-out infinite alternate",
  },
  {
    style: {
      width: "45%",
      height: "50%",
      top: "-5%",
      right: "5%",
      background: "radial-gradient(circle, #38bdf8 0%, #7dd3fc 40%, transparent 70%)",
      opacity: 0.6,
    },
    animation: "aurora-drift-5 11s ease-in-out infinite alternate",
  },
];

function AuroraBackgroundCore({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 overflow-hidden",
        className
      )}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            ...blobBase,
            ...blob.style,
            WebkitAnimation: blob.animation,
            animation: blob.animation,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 60%, transparent 80%)",
          backgroundSize: "250% 100%",
          WebkitAnimation: "aurora-shimmer 6s ease-in-out infinite",
          animation: "aurora-shimmer 6s ease-in-out infinite",
          willChange: "background-position",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export const AuroraBackground = React.memo(AuroraBackgroundCore);
