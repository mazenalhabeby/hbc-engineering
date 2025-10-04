import React, { PropsWithChildren } from "react";

export const PageContainser = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(1600px_800px_at_10%_-10%,#eaf3ff_0%,#d9ebff_60%,#cfe4ff_100%)]">
      {children}
    </main>
  );
};
