"use client";

import React from "react";

export default function GradientBackdrop({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#cfe2ff]">
      {/* Large blue sweep (matches your Contact CTA family) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* base vertical blend */}
        <div className="absolute inset-0 bg-[radial-gradient(160%_80%_at_50%_-10%,rgba(6,110,176,0.26),transparent_50%),linear-gradient(180deg,#d7e8ff_0%,#cfe2ff_26%,#cfe2ff_100%)]" />

        {/* soft right glow */}
        <div className="absolute right-[-20%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(6,110,176,0.28),transparent_65%)] blur-3xl" />

        {/* soft left glow */}
        <div className="absolute left-[-15%] bottom-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(61,162,220,0.26),transparent_65%)] blur-3xl" />

        {/* subtle noise for texture */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('/noise.png')] [background-size:200px]" />
      </div>

      {children}
    </div>
  );
}
