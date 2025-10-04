import * as React from "react";
import clsx from "clsx";

type InfoItem = {
  label: string;
  value: React.ReactNode; // string | JSX | list, etc.
  key?: string; // optional stable key
};

type BreakCols = {
  base?: 1 | 2 | 3 | 4;
  sm?: 1 | 2 | 3 | 4;
  md?: 1 | 2 | 3 | 4;
  lg?: 1 | 2 | 3 | 4;
};

type InfoGridProps = {
  items: InfoItem[];
  cols?: BreakCols; // control grid columns per breakpoint
  className?: string; // style overrides for the card
  itemClassName?: string; // style overrides for each cell
};

const colClass = (n?: number, prefix = "") =>
  n ? `${prefix}grid-cols-${n}` : "";

export default function InfoGrid({
  items,
  cols = { base: 1, sm: 2 }, // default 1 col mobile, 2 cols from sm+
  className,
  itemClassName,
}: InfoGridProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div
        className={clsx(
          "grid gap-4",
          colClass(cols.base),
          colClass(cols.sm, "sm:"),
          colClass(cols.md, "md:"),
          colClass(cols.lg, "lg:")
        )}
      >
        {items.map(({ label, value, key }, i) => (
          <div key={key ?? label ?? i} className={itemClassName}>
            <div className="text-xs text-slate-500">{label}</div>
            <div className="mt-1 font-medium">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
