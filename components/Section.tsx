import React from "react";
export default function Section({
  children,
  className = "",
  container = true,
  id,
}: React.PropsWithChildren<{
  className?: string;
  container?: boolean;
  id?: string;
}>) {
  return (
    <section id={id} className={className}>
      <div
        className={container ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : ""}
      >
        {children}
      </div>
    </section>
  );
}
