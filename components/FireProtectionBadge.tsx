"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FireProtectionBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Close when clicking outside on mobile
  useEffect(() => {
    if (!isTouchDevice) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTouchDevice]);

  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice && !isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
    }
    // If expanded or desktop, let the link work normally
  };

  return (
    <motion.div
      ref={badgeRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
      onMouseEnter={() => !isTouchDevice && setIsExpanded(true)}
      onMouseLeave={() => !isTouchDevice && setIsExpanded(false)}
      initial={{ x: 0 }}
      whileHover={{ x: isTouchDevice ? 0 : -4 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.a
        href="https://fire-protection.tech"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block"
      >
        {/* Main container */}
        <motion.div
          className="relative flex items-center"
        >
          {/* Glassmorphism card */}
          <motion.div
            layout
            className="relative flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-l-2xl overflow-hidden transition-shadow duration-500"
            style={{
              boxShadow: isExpanded
                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset"
                : "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}
            transition={{
              layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            {/* Subtle gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Premium accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />

            {/* Content wrapper */}
            <motion.div
              layout
              className="flex items-center gap-3 py-3"
              animate={{
                paddingLeft: isExpanded ? 16 : 12,
                paddingRight: isExpanded ? 16 : 12
              }}
              transition={{
                layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                paddingLeft: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                paddingRight: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              {/* Logo */}
              <motion.div
                layout
                className="relative flex-shrink-0 w-10 h-10"
                animate={{ scale: isExpanded ? 1.08 : 1 }}
                transition={{
                  layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                {/* Glow behind logo */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg"
                  style={{
                    background: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
                  }}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: isExpanded ? 1 : 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <Image
                  src="/images/logo.svg"
                  alt="Fire Protection"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Text content */}
              <AnimatePresence mode="sync">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, width: 180, scaleY: 1 }}
                    exit={{ opacity: 0, width: 0, scaleY: 0.8 }}
                    transition={{
                      width: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.25, ease: "easeInOut" },
                      scaleY: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                      exit: {
                        width: { duration: 0.4, ease: [0.4, 0, 0.6, 1] },
                        opacity: { duration: 0.2, ease: "easeIn" },
                        scaleY: { duration: 0.4, ease: [0.4, 0, 0.6, 1] }
                      }
                    }}
                    style={{ originY: 0.5 }}
                    className="flex flex-col justify-center overflow-hidden"
                  >
                    <motion.span
                      className="text-[10px] font-medium text-amber-400/80 uppercase tracking-[0.2em]"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
                    >
                      Explore
                    </motion.span>
                    <motion.span
                      className="text-base font-semibold text-white tracking-tight"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.08, ease: "easeOut" }}
                    >
                      Fire Protection
                    </motion.span>
                    <motion.span
                      className="text-[11px] text-white/60 mt-1 leading-relaxed w-[160px]"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.11, ease: "easeOut" }}
                    >
                      Blockchain-powered fire safety & compliance platform
                    </motion.span>
                    <motion.span
                      className="text-xs text-white/40 flex items-center gap-1.5 mt-1.5"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.14, ease: "easeOut" }}
                    >
                      {isTouchDevice ? "Tap to visit" : "fire-protection.tech"}
                      <motion.svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        initial={{ x: 0 }}
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </motion.svg>
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Minimal indicator when collapsed */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -left-1 top-1/2 -translate-y-1/2"
              >
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.a>
    </motion.div>
  );
}
