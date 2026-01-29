import { Suspense } from "react";
import { Home } from "./_home";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex w-full min-h-screen items-center justify-center">Loading...</div>}>
      <Home />
    </Suspense>
  );
}
