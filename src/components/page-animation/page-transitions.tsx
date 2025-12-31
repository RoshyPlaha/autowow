"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // initial hidden state
    gsap.set(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "bottom",
    });

    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0.9,
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      id="page-transition"
      className="fixed inset-0 z-[9999] bg-[#09293c] pointer-events-none flex items-center justify-center"
    >
      <div ref={logoRef} id="transition-logo">
        <Image
          src="/assets/logos/AR.png"
          alt="Brand logo"
          width={120}
          height={120}
          priority
        />
      </div>
    </div>
  );
}
