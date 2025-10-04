"use client";

import Image from "next/image";
import CTA from "./CTA";
import Ghost from "./Ghost";

interface FinalCTAProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageSrc?: string;
}

export default function FinalCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  imageSrc = "/images/Consultation.jpg",
}: FinalCTAProps) {
  return (
    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#066eb0] to-[#3da2dc] p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            {/* Text */}
            <div className="md:col-span-8">
              <h3 className="text-3xl font-extrabold sm:text-4xl">{title}</h3>
              <p className="mt-3 max-w-2xl text-white/90">{description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {primaryHref && (
                  <CTA href={primaryHref} light>
                    {primaryLabel}
                  </CTA>
                )}
                {secondaryHref && (
                  <Ghost href={secondaryHref}>{secondaryLabel}</Ghost>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative md:col-span-4">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Image
                  src={imageSrc}
                  alt="CTA Visual"
                  fill
                  sizes="(max-width:1024px) 100vw, 400px"
                  className="object-cover opacity-90"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_120px_at_0%_0%,rgba(255,255,255,0.6),transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
