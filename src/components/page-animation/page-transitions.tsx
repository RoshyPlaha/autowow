"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [logoPath, setLogoPath] = useState("/assets/logos/AR.png");
  const [primaryColor, setPrimaryColor] = useState("252525");

  // Get brandName from search params and update logo path
  useEffect(() => {
    const brandName = searchParams?.get("brandName") || "AR";
    const colorParam = searchParams?.get("primaryColor") || "09293d";
    // Construct logo path based on brandName
    const logo = `/assets/logos/${brandName}.png`;
    setLogoPath(logo);
    // Ensure primaryColor has # prefix
    const color = colorParam.startsWith("#") ? colorParam : `#${colorParam}`;
    setPrimaryColor(color);
  }, [searchParams]);

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
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{ backgroundColor: primaryColor }}
    >
      <div ref={logoRef} id="transition-logo">
        <Image
          src={logoPath}
          alt="Brand logo"
          width={120}
          height={120}
          priority
          key={logoPath} // Force re-render when logo changes
        />
      </div>
    </div>
  );
}
