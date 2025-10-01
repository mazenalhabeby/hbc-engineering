// components/ui/Hero.tsx
import React from "react";
import Section from "../Section";
import GradientBlobs from "../GradientBlobs";
import Eyebrow from "../Eyebrow";

export default function Hero({
  eyebrow,
  eyebrowColor = "blue",
  kicker,
  title,
  description,
  children,
  right, // ⬅️ NEW: media/content on the right
}: {
  eyebrow: string;
  eyebrowColor?: "blue" | "rose";
  kicker: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  right?: React.ReactNode; // ⬅️ NEW
}) {
  return (
    <Section className="relative overflow-hidden py-8">
      <GradientBlobs
        top={eyebrowColor === "rose" ? "bg-rose-300" : "bg-blue-300"}
        bottom={eyebrowColor === "rose" ? "bg-orange-300" : "bg-emerald-300"}
      />
      <div className="py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <Eyebrow text={eyebrow} color={eyebrowColor} />
            <div>
              <span className="text-xl font-bold tracking-wider">{kicker}</span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            </div>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-loose text-slate-600">
                {description}
              </p>
            ) : null}
            {children}
          </div>

          {/* Right (media) */}
          {right ? (
            <div className="relative">{right}</div>
          ) : (
            <div className="hidden md:block" /> // keep grid balance if no media
          )}
        </div>
      </div>
    </Section>
  );
}
