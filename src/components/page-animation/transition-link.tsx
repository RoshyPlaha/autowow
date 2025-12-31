"use client";

import Link from "next/link";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function TransitionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const overlay = document.getElementById("page-transition");
    const logo = document.getElementById("logo");

    if (!overlay) {
      router.push(href);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => router.push(href),
    });

    // WIPE IN
    tl.to(overlay, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.6,
      ease: "power4.inOut",
    });

    // LOGO IN
    tl.to(
      logo,
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      },
      "-=0.25"
    );

    // LOGO OUT (DISAPPEARS)
    tl.to(logo, {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: "power3.in",
    });

    // WIPE OUT (NO LOGO HERE)
    tl.to(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.6,
      ease: "power4.inOut",
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
