"use client";

import { Suspense } from "react";
import PageTransition from "./page-transitions";

export default function PageTransitionWrapper() {
  return (
    <Suspense fallback={null}>
      <PageTransition />
    </Suspense>
  );
}

