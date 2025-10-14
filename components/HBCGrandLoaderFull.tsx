"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = {
  /** Total time the overlay stays visible (ms), including exit animations */
  minShowMs?: number; // default 2000 in your use, can set 5000, etc.
  /** Circle wipe origin */
  revealFrom?: Corner;
  /** Headline text */
  title?: string;
  /** Subtitle under headline */
  subtitle?: string;
  /** Show on first paint */
  initialShow?: boolean;
  /** React to #hash-only changes as a "navigation" (default: false) */
  showOnHashChange?: boolean;
};

export default function HBCGrandLoaderFull({
  minShowMs = 5000,
  revealFrom = "bottom-right",
  title = "HBC Engineering",
  subtitle = "subtitle",
  initialShow = true,
  showOnHashChange = false,
}: Props) {
  const t = useTranslations("preload");
  const pathname = usePathname(); // App Router path (no hash)
  const [visible, setVisible] = React.useState<boolean>(initialShow);
  const [phase, setPhase] = React.useState<
    "enter" | "hold" | "lettersOut" | "wipe"
  >("enter");

  // ---- CONFIG: exit animation durations (keep these in sync with your animations)
  const LETTERS_OUT_MS = 520; // time between switching to lettersOut and starting wipe
  const WIPE_MS = 700; // circle wipe duration
  const EXIT_CHAIN_MS = LETTERS_OUT_MS + WIPE_MS;

  // ---- timers & guards
  const timers = React.useRef<number[]>([]);
  const inFlightRef = React.useRef(false);
  const lastKeyRef = React.useRef<string | null>(null);

  // Returns a stable “route key” we compare against to decide when to show the loader.
  // If you want to react to hash changes, read from window.location.hash as well.
  const routeKey = React.useMemo(() => {
    if (typeof window === "undefined") return pathname ?? "";
    return showOnHashChange
      ? `${pathname ?? ""}${window.location.hash}`
      : pathname ?? "";
  }, [pathname, showOnHashChange]);

  const clearAll = React.useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const later = React.useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms) as unknown as number;
    timers.current.push(id);
    return id;
  }, []);

  const run = React.useCallback(() => {
    // Prevent re-entry while current run is active
    if (inFlightRef.current) return;

    inFlightRef.current = true;
    setVisible(true);
    setPhase("enter");

    // small enter dwell before holding (purely visual)
    later(() => setPhase("hold"), 180);

    // We want TOTAL visible time (from now until unmount) to be exactly minShowMs.
    // So we start the exit chain at (minShowMs - EXIT_CHAIN_MS), never negative.
    const holdMs = Math.max(0, minShowMs - EXIT_CHAIN_MS);

    // Begin letters-out at the right moment
    later(() => {
      setPhase("lettersOut");
      // Then start the wipe
      later(() => setPhase("wipe"), LETTERS_OUT_MS);
      // And finally unmount after the wipe ends
      later(() => {
        setVisible(false);
        inFlightRef.current = false;
      }, LETTERS_OUT_MS + WIPE_MS);
    }, holdMs);
  }, [minShowMs, EXIT_CHAIN_MS, LETTERS_OUT_MS, WIPE_MS, later]);

  // first mount
  React.useEffect(() => {
    if (initialShow) run();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialShow]);

  // on route change (or hash change if enabled), replay once
  React.useEffect(() => {
    if (lastKeyRef.current === null) {
      lastKeyRef.current = routeKey;
      return;
    }
    if (routeKey !== lastKeyRef.current) {
      lastKeyRef.current = routeKey;
      run();
    }
  }, [routeKey, run]);

  // cleanup timers on unmount
  React.useEffect(() => clearAll, [clearAll]);

  // circle wipe origin
  const clipAt = React.useMemo(() => {
    switch (revealFrom) {
      case "top-left":
        return "0% 0%";
      case "top-right":
        return "100% 0%";
      case "bottom-left":
        return "0% 100%";
      default:
        return "100% 100%";
    }
  }, [revealFrom]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="grand-loader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ clipPath: `circle(150% at ${clipAt})` }} // already fully covering
          animate={{ clipPath: `circle(150% at ${clipAt})` }} // stay covered while visible
          exit={{ clipPath: `circle(0% at ${clipAt})` }} // wipe away on exit
          transition={{ duration: WIPE_MS / 1000, ease: "easeInOut" }}
        >
          <GradientBackground />

          <div className="relative z-10 grid h-full place-items-center">
            <div className="px-6 text-center">
              <AnimatedHeadline text={title} phase={phase} />

              <motion.p
                className="mt-4 text-base sm:text-lg text-white/75"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === "lettersOut" ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {t("subtitle")}
              </motion.p>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: phase === "wipe" ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              background:
                "radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0.08), rgba(0,0,0,0.18))",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------- Background ----------------------- */

function GradientBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(1600px_900px_at_10%_-10%,#bfe1ff_0%,#a9d6ff_30%,#86c2ff_60%,#6fb5ff_75%,#5aa6ff_100%)]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 220deg at 70% 30%, rgba(34,211,238,0.18), rgba(99,102,241,0.18), rgba(34,197,94,0.18), rgba(34,211,238,0.18))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <Blob x="8%" y="20%" size={520} color="rgba(59,130,246,0.35)" dur={16} />
      <Blob
        x="80%"
        y="18%"
        size={480}
        color="rgba(16,185,129,0.32)"
        dur={18}
        delay={0.6}
      />
      <Blob
        x="30%"
        y="78%"
        size={620}
        color="rgba(99,102,241,0.30)"
        dur={20}
        delay={1.1}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,\
<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22>\
<filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter>\
<rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />
    </div>
  );
}

function Blob({
  x,
  y,
  size,
  color,
  dur,
  delay = 0,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  dur: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      initial={{ scale: 0.95, opacity: 0.7 }}
      animate={{ scale: [0.95, 1.07, 0.95], opacity: [0.7, 0.9, 0.7] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* -------------------- Animated Headline ------------------- */

function AnimatedHeadline({
  text,
  phase,
}: {
  text: string;
  phase: "enter" | "hold" | "lettersOut" | "wipe";
}) {
  const letters = Array.from(text);
  return (
    <div className="leading-none">
      <motion.h1
        aria-label={text}
        className="text-center font-extrabold tracking-tight text-white/80 bg-clip-text
                   bg-[linear-gradient(120deg,#ffffff_0%,#eaf6ff_30%,#e0f1ff_50%,#ffffff_70%,#eaf6ff_100%)]
                   drop-shadow-[0_10px_30px_rgba(24,66,120,0.25)]
                   [text-shadow:_0_2px_14px_rgba(0,0,0,0.15)]"
        style={{ fontSize: "clamp(2.6rem, 6vw, 6.2rem)" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={
              phase === "enter" || phase === "hold"
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : phase === "lettersOut"
                ? { opacity: 0, y: -24, rotate: -6, filter: "blur(3px)" }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: phase === "enter" ? i * 0.02 : 0,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
