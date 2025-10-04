import Link from "next/link";

export default function CTA({
  href,
  children,
  light = false,
}: {
  href: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  return (
    <Link
      href={href}
      className={
        light
          ? `${base} text-[#0b2a3a] bg-white shadow-[0_10px_30px_rgba(255,255,255,0.20)] hover:-translate-y-0.5`
          : `${base} text-white bg-[#066eb0] shadow-[0_10px_30px_rgba(6,110,176,0.35)] hover:-translate-y-0.5`
      }
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className={light ? "text-[#066eb0]" : "text-white"}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 2v4M16 2v4M3 10h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>{children ?? "Schedule Consultation"}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-y-8 -left-24 w-24 rotate-12 bg-white/30 blur-[8px] transition-transform duration-700 group-hover:translate-x-[160%]" />
      </span>
    </Link>
  );
}
