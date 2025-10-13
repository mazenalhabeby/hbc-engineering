// app/loading.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoading() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="route-loading"
        className="fixed inset-0 z-[9999] grid place-items-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        aria-busy="true"
        aria-live="polite"
      >
        {/* Logo + pulse */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="flex flex-col items-center gap-4"
        >
          {/* replace with your SVG/logo */}
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500" />
          <div className="text-sm text-muted-foreground tracking-wide">
            Loading…
          </div>

          {/* progress shimmer */}
          <div className="relative mt-2 h-1 w-56 overflow-hidden rounded-full bg-muted">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-foreground/70"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
