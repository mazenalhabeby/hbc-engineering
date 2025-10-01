import React from "react";
export default function Eyebrow({
  text,
  color = "blue",
}: {
  text: string;
  color?: "blue" | "rose";
}) {
  const palette =
    color === "rose"
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : "bg-blue-50 text-blue-700 ring-blue-200";
  return (
    <p
      className={`mb-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ${palette}`}
    >
      {text}
    </p>
  );
}
