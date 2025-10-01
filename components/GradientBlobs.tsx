import React from "react";
export default function GradientBlobs({
  top = "bg-blue-300",
  bottom = "bg-emerald-300",
}: {
  top?: string;
  bottom?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className={`absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 ${top}`}
      />
      <div
        className={`absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 ${bottom}`}
      />
    </div>
  );
}
