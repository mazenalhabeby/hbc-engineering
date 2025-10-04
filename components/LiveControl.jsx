"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function LiveThermostat() {
  const MIN = 16;
  const MAX = 28;

  const START_DEG = -140;
  const END_DEG = 140;

  const RING_RADIUS = 82;
  const RING_WIDTH = 12;

  const temp = useMotionValue(22);
  const tSpring = useSpring(temp, { stiffness: 220, damping: 24, mass: 0.9 });

  const [mode, setMode] = useState("Auto");

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const angleDeg = useTransform(tSpring, [MIN, MAX], [START_DEG, END_DEG]);
  const pct = useTransform(tSpring, [MIN, MAX], [0, 100]);

  const hue = useTransform(tSpring, [MIN, 22, MAX], [205, 190, 8]);
  const accent = useTransform(hue, (h) => `hsl(${h} 80% 45%)`);
  const soft = useTransform(hue, (h) => `hsl(${h} 85% 96%)`);
  const ringBg = useTransform(hue, (h) => `hsl(${h} 40% 88%)`);
  const glow = useTransform(hue, (h) => `hsla(${h}, 100%, 50%, 0.18)`);

  const glowA = useTransform(tSpring, [MIN, MAX], [0.12, 0.24]);
  const cardShadow = useTransform([glow, glowA], ([g, a]) =>
    `0 30px 70px 0 ${g.replace("0.18", a.toFixed(2))}`
  );

  const bgGradient = useTransform([soft, glow], ([s, g]) =>
    `radial-gradient(1200px 600px at 15% -10%, ${s} 0%, transparent 60%),
     radial-gradient(800px 400px at 90% 10%, ${g.replace("0.18", "0.22")} 0%, transparent 55%)`
  );

  const C = 2 * Math.PI * RING_RADIUS;
  const dashOffset = useTransform(pct, (p) => C - (p / 100) * C);

  const targets = useMemo(() => ({ Auto: 22, Heat: 26, Cool: 19 }), []);

  const setModeAndAnimate = (nextMode) => {
    setMode(nextMode);
    const to = targets[nextMode];
    const controls = animate(temp, to, { duration: 0.6, ease: "easeInOut" });
    return () => controls.stop();
  };

  const step = 0.5;
  const nudge = (dir) => {
    temp.set(clamp(Number((temp.get() + dir * step).toFixed(1)), MIN, MAX));
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      nudge(1);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      nudge(-1);
      e.preventDefault();
    }
  };

  const [displayLabel, setDisplayLabel] = useState("Balanced");
  useEffect(() => {
    const unsub = tSpring.on("change", (v) => {
      if (mode === "Auto") {
        if (v <= 19.5) setDisplayLabel("Cooling");
        else if (v >= 24.5) setDisplayLabel("Heating");
        else setDisplayLabel("Balanced");
      }
    });
    return () => unsub();
  }, [tSpring, mode]);

  const holdTimer = useRef(null);
  const holdInterval = useRef(null);

  const startHold = (dir) => {
    nudge(dir);
    holdTimer.current = window.setTimeout(() => {
      holdInterval.current = window.setInterval(() => nudge(dir), 110);
    }, 260);
  };
  const stopHold = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (holdInterval.current) {
      window.clearInterval(holdInterval.current);
      holdInterval.current = null;
    }
  };

  const tNow = Math.round(useSpring(temp).get());

  return (
    <section className="relative py-10">
      <motion.div
        style={{ background: bgGradient }}
        className="mx-auto max-w-7xl rounded-[32px] px-4 py-10 sm:px-6 lg:px-8"
      >
        <motion.div
          style={{ boxShadow: cardShadow }}
          className="grid grid-cols-1 items-center gap-10 rounded-[28px] border border-white/60 bg-white/70 p-6 md:grid-cols-12 md:p-10 backdrop-blur"
        >
          <div className="md:col-span-7">
            <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Live comfort control
            </h3>
            <p className="mt-3 max-w-2xl text-slate-600">
              Tap the arrows or presets to set the temperature.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Auto", "Heat", "Cool"].map((m) => (
                <motion.button
                  key={m}
                  onClick={() => setModeAndAnimate(m)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    mode === m
                      ? "border-transparent font-semibold text-white"
                      : "border-slate-300/70 bg-white/60 text-slate-700 hover:bg-white"
                  }`}
                  style={mode === m ? { background: accent } : undefined}
                >
                  {m}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <Stat label="Target" value={`${targets[mode]}°C`} accent={accent} />
              <Stat
                label="Energy mode"
                value={mode === "Heat" ? "High" : mode === "Cool" ? "Eco+" : "Balanced"}
                accent={accent}
              />
              <Stat label="Airflow" value={mode === "Cool" ? "Fast" : "Normal"} accent={accent} />
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl"
              role="slider"
              aria-label="Climate setpoint"
              aria-valuemin={MIN}
              aria-valuemax={MAX}
              aria-valuenow={tNow}
              tabIndex={0}
              onKeyDown={onKey}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Climate</span>
                <motion.span style={{ color: accent }} className="font-semibold">
                  {mode}
                </motion.span>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-5 md:grid-cols-[1fr_auto]">
                <div className="grid place-items-center">
                  <div className="relative h-52 w-52 sm:h-56 sm:w-56">
                    <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full select-none">
                      <motion.circle
                        cx={100}
                        cy={100}
                        r={RING_RADIUS}
                        strokeWidth={RING_WIDTH}
                        className="fill-none"
                        style={{ stroke: ringBg, opacity: 0.85 }}
                      />
                      <motion.circle
                        cx={100}
                        cy={100}
                        r={RING_RADIUS}
                        strokeWidth={RING_WIDTH}
                        className="fill-none"
                        strokeLinecap="round"
                        style={{
                          stroke: accent,
                          strokeDasharray: C,
                          strokeDashoffset: dashOffset,
                          filter: "drop-shadow(0 0 12px rgba(0,0,0,0.08))",
                        }}
                        transform="rotate(-90 100 100)"
                      />
                      <Knob angle={angleDeg} accent={accent} radius={RING_RADIUS} />
                    </motion.svg>
                    <motion.div
                      style={{ background: soft }}
                      className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-inner sm:h-36 sm:w-36"
                    >
                      <div className="text-center leading-none">
                        <div className="text-[36px] font-extrabold text-slate-900 sm:text-[40px]">{tNow}°C</div>
                        <motion.div style={{ color: accent }} className="text-[11px] font-medium sm:text-xs">
                          {mode === "Auto"
                            ? displayLabel
                            : mode === "Heat"
                            ? "Heating"
                            : "Cooling"}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex h-full flex-col items-center justify-center">
                  <motion.div
                    className="relative grid w-14 select-none grid-rows-[auto,1fr,auto] overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-1 backdrop-blur sm:w-16"
                    style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
                  >
                    <IconButton
                      aria-label="Increase temperature"
                      onPointerDown={() => startHold(1)}
                      onPointerUp={stopHold}
                      onPointerLeave={stopHold}
                      onClick={() => nudge(1)}
                    >
                      <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
                    </IconButton>
                    <motion.div className="mx-auto my-1 h-[1px] w-8 opacity-60" style={{ background: ringBg }} />
                    <IconButton
                      aria-label="Decrease temperature"
                      onPointerDown={() => startHold(-1)}
                      onPointerUp={stopHold}
                      onPointerLeave={stopHold}
                      onClick={() => nudge(-1)}
                    >
                      <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
                    </IconButton>
                  </motion.div>
                  <div className="mt-2 text-[10px] text-slate-500 sm:text-[11px]">0.5°C step</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Knob({ angle, accent, radius }) {
  const cx = useTransform(angle, (deg) => 100 + radius * Math.cos(((deg - 90) * Math.PI) / 180));
  const cy = useTransform(angle, (deg) => 100 + radius * Math.sin(((deg - 90) * Math.PI) / 180));
  return <motion.circle cx={cx} cy={cy} r={8} style={{ fill: accent }} stroke="white" strokeWidth={3} />;
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/70 p-3 text-center">
      <div className="text-[11px] font-medium text-slate-500">{label}</div>
      <motion.div style={{ color: accent }} className="mt-0.5 text-sm font-semibold">{value}</motion.div>
    </div>
  );
}

function IconButton({ children, onPointerDown, onPointerUp, onPointerLeave, onClick, "aria-label": ariaLabel }) {
  return (
    <motion.button
      aria-label={ariaLabel}
      whileTap={{ scale: 0.97 }}
      className="grid h-14 place-items-center rounded-xl bg-white/70 shadow-sm ring-1 ring-slate-200/70 hover:bg-white active:shadow-inner sm:h-16"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}