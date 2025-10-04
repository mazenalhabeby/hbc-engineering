import { motion } from "framer-motion";
import { useState } from "react";

export default function TiltCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
        setXY({ x, y });
      }}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      style={{
        rotateX: -xy.y,
        rotateY: xy.x,
        transformStyle: "preserve-3d",
      }}
      className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur will-change-transform"
    >
      {children}
    </motion.div>
  );
}
