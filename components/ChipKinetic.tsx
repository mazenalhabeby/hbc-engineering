import { motion } from "framer-motion";
import { useState } from "react";

export default function ChipKinetic({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [h, setH] = useState(false);
  return (
    <motion.span
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-sm text-slate-800 shadow-sm backdrop-blur"
    >
      <motion.span
        animate={{ scale: h ? 1.4 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="h-1.5 w-1.5 rounded-full bg-[#066eb0]"
      />
      {children}
    </motion.span>
  );
}
