"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = {
  /** Minimum display time (ms) before loader can exit. Default: 1200ms for optimal UX */
  minShowMs?: number;
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
  minShowMs = 800,
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
  const POST_LOAD_DELAY_MS = 300; // Wait 300ms after page loads (quick UX)
  const MAX_LOADER_TIME_MS = 3000; // Maximum time loader can be visible (fallback - 3 seconds)

  // ---- timers & guards
  const timers = React.useRef<number[]>([]);
  const inFlightRef = React.useRef(false);
  const lastKeyRef = React.useRef<string | null>(null);
  const isInitialLoadRef = React.useRef(true);

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

  // Check if page content is ready
  const checkContentReady = React.useCallback(() => {
    if (typeof window === "undefined") return false;

    try {
      // Check DOM readiness
      const isDOMReady = document.readyState === "complete" || document.readyState === "interactive";
      if (!isDOMReady) return false;

      // Check if body has meaningful content
      const hasBody = document.body && document.body.children.length > 0;
      if (!hasBody) return false;

      // Check if main content area exists (adjust selector as needed)
      const hasMainContent = document.querySelector("main") !== null ||
                            document.querySelector("#__next") !== null ||
                            document.querySelector('[role="main"]') !== null;

      // If no main content yet, not ready
      if (!hasMainContent) return false;

      // Check images - be lenient
      const images = Array.from(document.images);
      if (images.length === 0) return true; // No images = ready

      // Only wait for first few critical images
      const criticalImages = images.slice(0, 3); // First 3 images only
      const criticalLoaded = criticalImages.filter(
        (img) => img.complete && img.naturalHeight !== 0
      );

      // If at least one critical image loaded or 40% of all images, consider ready
      return criticalLoaded.length > 0 || (images.length > 0 && criticalLoaded.length / images.length >= 0.4);
    } catch (e) {
      // If error checking, assume ready to avoid getting stuck
      console.warn("Error checking content ready:", e);
      return true;
    }
  }, []);

  // Start the exit animation sequence
  const startExitSequence = React.useCallback(() => {
    if (!inFlightRef.current) return; // Guard: only exit if loader is active

    setPhase("lettersOut");
    // Then start the wipe
    later(() => setPhase("wipe"), LETTERS_OUT_MS);
    // And finally unmount after the wipe ends
    later(() => {
      setVisible(false);
      inFlightRef.current = false;
    }, LETTERS_OUT_MS + WIPE_MS);
  }, [LETTERS_OUT_MS, WIPE_MS, later]);

  const startTimeRef = React.useRef<number>(0);

  // Wait for page content to load, then trigger exit
  const waitForPageLoad = React.useCallback(() => {
    if (!inFlightRef.current) return;

    const startTime = Date.now();
    const isNavigation = !isInitialLoadRef.current;

    // For navigation, use very short times; for initial load, slightly longer
    const minDisplayTime = isNavigation
      ? Math.max(300, minShowMs - EXIT_CHAIN_MS)  // 300ms min for navigation
      : Math.max(400, minShowMs - EXIT_CHAIN_MS); // 400ms min for initial load

    const maxTime = isNavigation ? 2000 : MAX_LOADER_TIME_MS; // 2s for navigation, 3s for initial

    // Function to check if we should start the exit
    const checkAndExit = () => {
      if (!inFlightRef.current) return; // Loader was already hidden

      const elapsed = Date.now() - startTime;
      const contentReady = checkContentReady();

      // Exit conditions (prioritized for best UX):
      if (elapsed >= maxTime) {
        // Fallback: force exit after max time
        startExitSequence();
      } else if (contentReady && elapsed >= minDisplayTime) {
        // Content is ready and minimum time has passed, wait POST_LOAD_DELAY then exit
        later(() => startExitSequence(), POST_LOAD_DELAY_MS);
      } else {
        // Keep checking every 100ms for faster response
        later(() => checkAndExit(), 100);
      }
    };

    // Start checking immediately for initial load, with small delay for navigation
    if (isNavigation) {
      // Give React time to render the new route before checking
      later(() => checkAndExit(), 100);
    } else {
      checkAndExit();
    }
  }, [
    minShowMs,
    EXIT_CHAIN_MS,
    POST_LOAD_DELAY_MS,
    MAX_LOADER_TIME_MS,
    checkContentReady,
    startExitSequence,
    later,
  ]);

  const run = React.useCallback(() => {
    // Prevent re-entry while current run is active
    if (inFlightRef.current) return;

    inFlightRef.current = true;
    startTimeRef.current = Date.now();
    setVisible(true);
    setPhase("enter");

    // Small enter dwell before holding (purely visual)
    later(() => setPhase("hold"), 180);

    // Start waiting for page load
    waitForPageLoad();
  }, [later, waitForPageLoad]);

  // first mount - handle both initial load and full page refresh
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if this is a fresh page load
    let isPageLoad = true;
    try {
      const navEntries = performance.getEntriesByType?.("navigation") as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const navType = navEntries[0].type;
        isPageLoad = navType === "navigate" || navType === "reload";
      }
    } catch {
      // Fallback: assume it's a page load
      isPageLoad = true;
    }

    if (initialShow && isPageLoad) {
      // Reset any stuck state from previous session
      inFlightRef.current = false;
      clearAll();

      run();
    }

    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialShow]);

  // on route change (or hash change if enabled), replay once
  React.useEffect(() => {
    if (lastKeyRef.current === null) {
      lastKeyRef.current = routeKey;
      isInitialLoadRef.current = false;
      return;
    }
    if (routeKey !== lastKeyRef.current) {
      lastKeyRef.current = routeKey;

      // If loader is already running, force stop it first
      if (inFlightRef.current) {
        clearAll(); // Clear any pending timers
        inFlightRef.current = false;
        setVisible(false);

        // Small delay before starting new loader for clean transition
        setTimeout(() => {
          run();
        }, 50);
      } else {
        clearAll();
        run();
      }
    }
  }, [routeKey, run, clearAll]);

  // cleanup timers on unmount
  React.useEffect(() => clearAll, [clearAll]);

  // Safety mechanism: force close loader if visible for too long
  React.useEffect(() => {
    if (!visible) return;

    // Absolute maximum time - force close no matter what
    const safetyTimeout = setTimeout(() => {
      if (inFlightRef.current && visible) {
        console.warn("HBCGrandLoader: Force closing loader after maximum time");
        clearAll();
        setVisible(false);
        inFlightRef.current = false;
      }
    }, 5000); // 5 seconds absolute maximum

    return () => clearTimeout(safetyTimeout);
  }, [visible, clearAll]);

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
