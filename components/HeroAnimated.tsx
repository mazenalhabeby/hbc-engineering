"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlassCard from "./GlassCard";
import Marquee from "./Marquee";
import ChipKinetic from "./ChipKinetic";
import CTA from "./CTA";
import Wave from "./Wave";

export type HeroAnimatedProps = {
  marquee?: string;
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  chips?: string[];
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  heroImage: string;
  miniStack?: string[];
  /** Called when the hero image finishes loading */
  onHeroLoaded?: () => void;
};

export default function HeroAnimated({
  marquee = "HBC • ENGINEERING • RELIABILITY • ",
  badge,
  title,
  highlight,
  description,
  chips = [],
  cta,
  secondaryCta,
  heroImage,
  onHeroLoaded,
}: HeroAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section ref={ref} className="relative pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-6 z-0 select-none">
        <Marquee word={marquee} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-6"
        >
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#066eb0]/10 px-3 py-1 text-sm font-semibold text-[#066eb0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
              {badge}
            </span>
          )}

          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-[#066eb0]">{highlight}</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">{description}</p>

          {chips.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {chips.map((t, i) => (
                <ChipKinetic key={t} delay={i * 0.04}>
                  {t}
                </ChipKinetic>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {cta && <CTA href={cta.href}>{cta.label}</CTA>}
            {secondaryCta && (
              <CTA href={secondaryCta.href} light>
                {secondaryCta.label}
              </CTA>
            )}
          </div>
        </motion.div>

        {/* Right */}
        <div className="relative md:col-span-6">
          <motion.div
            style={{ y: yA, rotate: rot }}
            className="relative mx-auto h-[420px] max-w-[560px]"
          >
            <GlassCard src={heroImage} priority onLoaded={onHeroLoaded} />
          </motion.div>
        </div>
      </div>

      <Wave className="text-[#cfe4ff]" />
    </section>
  );
}
