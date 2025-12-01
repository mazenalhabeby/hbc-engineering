"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

/* ========= EDIT THESE ========= */
const EMAIL_LOCAL_PARTS = ["office", "careers"]; // first item is default
const EMAIL_DOMAIN = `@${siteConfig.domain}`;
const PANEL_IMAGES = ["/hbc-logo.svg"]; // put files in /public
/* ================================= */

export default function CinematicFooter() {
  const t = useTranslations("footer");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setNewsletterEmail("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="
        relative overflow-hidden bg-[#0d0d0e] text-white
        pb-24 sm:pb-16
      "
      style={{ paddingBottom: "max(6rem, env(safe-area-inset-bottom))" }}
    >
      {/* BIG MOVING WORD */}
      <div className="pointer-events-none absolute inset-x-0 z-0 select-none">
        <MarqueeWord word="HBC-ENGINEERING" />
      </div>

      {/* content */}
      <div
        className="
          relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 gap-8
          px-4 sm:px-6 md:gap-10 lg:grid-cols-12 lg:px-8 py-12
        "
      >
        {/* LEFT: brand + emails + phone + newsletter */}
        <div className="col-span-12 flex flex-col justify-center gap-10 sm:gap-12 lg:col-span-6 pt-16 sm:pt-20">
          <div className="space-y-2 sm:space-y-3">
            <div className="text-xl sm:text-2xl font-extrabold">
              {siteConfig.company}
            </div>
            <p className="text-white/70 text-base sm:text-[17px]">
              260 Peachtree Street
              <br />
              30303 Atlanta
              <br />
              Georgia, USA
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
              {t("writeUs")}
            </div>
            <HoverEmails locals={EMAIL_LOCAL_PARTS} domain={EMAIL_DOMAIN} />
          </div>

          <div>
            <div className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
              {t("callUs")}
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold">
              <a href={`tel:${siteConfig.phone}`} className="hover:underline">
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <form className="w-full max-w-md" onSubmit={handleNewsletterSubmit}>
            <label className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
              {t("subscribe")}
            </label>
            <div className="mt-2 flex gap-3">
              <input
                type="email"
                name="email"
                inputMode="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="
                  min-w-0 flex-1 rounded-none border-0 border-b border-white/25
                  bg-transparent px-0 py-2 text-white placeholder-white/40
                  focus:border-white focus:outline-none text-base sm:text-[17px]
                  disabled:opacity-50
                "
              />
              {/* Honeypot field - hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="absolute left-[-9999px]"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  rounded-full bg-white px-4 py-2 text-sm sm:text-[15px]
                  font-semibold text-black transition hover:bg-white/90
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? "..." : t("send")}
              </button>
            </div>
            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-green-400"
              >
                Thank you for subscribing! Check your email for confirmation.
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-red-400"
              >
                {errorMessage}
              </motion.div>
            )}
          </form>
        </div>

        {/* RIGHT: glassy panel (hidden on mobile) */}
        <div className="relative col-span-12 hidden items-center justify-center lg:col-span-6 lg:flex">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-white/5 blur-3xl" />
          <Panel src={PANEL_IMAGES[0]} />
        </div>
      </div>

      {/* bottom bar */}
      <div className="absolute inset-x-0 bottom-0">
        <div
          className="
            mx-auto flex max-w-7xl flex-col items-center justify-between gap-3
            px-4 sm:px-6 py-4 sm:py-6 text-sm text-white/60 lg:flex-row lg:px-8
          "
        >
          <div>© {new Date().getFullYear()} HBC Engineering</div>
          <div className="flex items-center gap-6">
            <a className="hover:text-white" href="#">
              Instagram ↗
            </a>
            <a className="hover:text-white" href="#">
              LinkedIn ↗
            </a>
            <a className="hover:text-white" href="#">
              Legal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function HoverEmails({ locals, domain }: { locals: string[]; domain: string }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="space-y-3">
      {locals.map((lp, i) => {
        const address = `${lp}${domain}`;
        const isActive = i === active;
        return (
          <li key={lp}>
            <a
              href={`mailto:${address}`}
              className="
                flex items-baseline gap-2
                text-[clamp(20px,6vw,44px)] leading-none font-extrabold
                touch-manipulation
              "
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(0)}
              onBlur={() => setActive(0)}
            >
              <span className={isActive ? "text-white" : "text-white/90"}>
                {lp}
              </span>
              {isActive && (
                <motion.span
                  layoutId="floating-domain"
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 38,
                    mass: 0.6,
                  }}
                  className="ml-2 text-[clamp(14px,4.5vw,28px)] font-semibold text-white/70"
                >
                  {domain}
                </motion.span>
              )}
            </a>
            <span
              className={`mt-1 block h-px bg-white/30 transition-all duration-200 ${
                isActive ? "w-full" : "w-0"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}

function Panel({ src }: { src: string }) {
  return (
    <div className="relative h-[56vh] w-[40vh] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center px-2 backdrop-blur-sm">
      <Image
        src={src}
        alt=""
        className="object-contain w-auto h-auto"
        width={120}
        height={120}
        priority
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_120px_at_0%_0%,rgba(255,255,255,0.45),transparent_60%)]" />
    </div>
  );
}

/** Infinite marquee word — bold across all screens */
function MarqueeWord({ word }: { word: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0d0d0e] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0d0d0e] to-transparent" />
      <div className="mx-auto max-w-[2000px] overflow-hidden">
        <div className="marquee-row">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-row {
          display: flex;
          gap: 8vw;
          padding: 0 2vw;
          white-space: nowrap;
          will-change: transform;
          animation: marqueeX 34s linear infinite;
        }
        .marquee-word {
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: min(20vw, 120px); /* bold on mobile */
          line-height: 0.9;
          color: rgba(255, 255, 255, 0.08);
          user-select: none;
        }
        @media (min-width: 640px) {
          .marquee-word {
            font-size: min(16vw, 220px); /* larger on tablet+ */
            color: rgba(255, 255, 255, 0.06);
          }
        }
        @keyframes marqueeX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
