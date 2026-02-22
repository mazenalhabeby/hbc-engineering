"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
const Boxes = dynamic(
  () =>
    import("@/components/ui/background-boxes").then((mod) => ({
      default: mod.Boxes,
    })),
  { ssr: false, loading: () => null }
);
import { useTranslations } from "next-intl";

// Lazy load heavy 3D components
const ThreeCanvas = dynamic(() => import("@/components/3d_logo/ThreeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-100/50 to-blue-200/50 rounded-2xl animate-pulse" />
  ),
});

const LogoStage = dynamic(() => import("@/components/3d_logo/LogoStage"), {
  ssr: false,
});

const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => mod.OrbitControls),
  { ssr: false }
);

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
    mid: "midTitle",
    tail: "tailTitle",
  },
}: HeroProps) {
  const t = useTranslations("home");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_40%,#d0eafe_0%,#d0eafe_60%,#83bff1_100%)] min-h-screen"
    >
      <AuroraBackground />
      <div className="absolute inset-0 z-[1] opacity-40">
        <Boxes />
      </div>
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full bg-[#c6e0f4]"
        style={{
          WebkitClipPath: "polygon(100% 100%, 100% 100%, 0% 84%, 0% 100%)",
          clipPath: "polygon(100% 100%, 100% 100%, 0% 84%, 0% 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full bg-[#d9ecfb]"
        style={{
          WebkitClipPath: "polygon(100% 100%, 100% 100%, 0% 85%, 0% 100%)",
          clipPath: "polygon(100% 100%, 100% 100%, 0% 85%, 0% 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2
                gap-10 px-4 sm:px-6 lg:px-8
                min-h-screen items-center"
      >
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
              {t(title.mid as string)}
            </span>
            <span className="mt-2 block text-[clamp(1.5rem,3.8vw,3rem)] font-light">
              {t(title.tail as string)}
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
