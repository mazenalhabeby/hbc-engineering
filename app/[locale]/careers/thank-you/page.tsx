import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<main className="min-h-screen pt-12" />}>
      <ThankYouClient />
    </Suspense>
  );
}
