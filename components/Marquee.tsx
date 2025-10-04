export default function Marquee({ word }: { word: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#eaf3ff] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#eaf3ff] to-transparent" />
      <div className="mx-auto max-w-[2000px] overflow-hidden">
        <div className="marquee-row">
          {[...Array(8)].map((_, i) => (
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
          animation: marqueeX 32s linear infinite;
        }
        .marquee-word {
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: min(20vw, 120px);
          line-height: 0.9;
          color: rgba(6, 110, 176, 0.08);
          user-select: none;
        }
        @media (min-width: 640px) {
          .marquee-word {
            font-size: min(16vw, 220px);
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
