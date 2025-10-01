"use client";

import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import ThreeCanvas from "@/components/3d_logo/ThreeCanvas";
import LogoStage from "@/components/3d_logo/LogoStage";
import { Boxes } from "@/components/ui/background-boxes";

type HeroProps = {
  title?: {
    highlight?: string;
    mid?: string;
    tail?: string;
  };
};

export default function Hero({
  title = {
    highlight: "Engineering",
    mid: "the Future,",
    tail: "Partnering With You Today",
  },
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_40%,#d0eafe_0%,#d0eafe_60%,#83bff1_100%)] min-h-screen"
    >
      <Boxes />
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full bg-[#c6e0f4]"
        style={{
          clipPath: "polygon(100% 100%, 100% 100%, 0% 84%, 0% 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full bg-[#d9ecfb]"
        style={{
          clipPath: "polygon(100% 100%, 100% 100%, 0% 85%, 0% 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8 min-h-[100svh] md:min-h-0 pt-[calc(env(safe-area-inset-top)+88px)] md:grid-cols-2 md:pt-20 pb-16 md:pb-24 items-start md:items-center">
        <div className="flex h-full flex-col items-start justify-end md:justify-center gap-6">
          <h1
            id="hero-heading"
            className="font-orbitron text-balance leading-tight tracking-wide
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize"
          >
            <span className="block text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase text-[#a31613] tracking-normal">
              {title.highlight}
            </span>
            <span className=" block text-[clamp(2rem,4.5vw,3.5rem)] font-semibold">
              {title.mid}
            </span>
            <span className="mt-2 block text-[clamp(1.5rem,3.8vw,3rem)] font-light">
              {title.tail}
            </span>
          </h1>
        </div>
        <div className="relative">
          {/* Mobile */}
          <div className="relative block h-[320px] md:hidden">
            <ThreeCanvas>
              <Suspense fallback={null}>
                <LogoStage targetSize={4} frame={1} yLift={0.3} />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.6}
              />
            </ThreeCanvas>
            <span className="sr-only">Brand 3D logo visual.</span>
          </div>

          {/* large screen */}
          <div className="relative hidden h-[520px] md:block lg:h-[640px]">
            <ThreeCanvas>
              <Suspense fallback={null}>
                <LogoStage />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.6}
              />
            </ThreeCanvas>
            <span className="sr-only">Brand 3D logo visual.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
