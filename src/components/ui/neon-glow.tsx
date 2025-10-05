"use client";

import { cn } from "@/lib/utils";

interface NeonGlowProps {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
}

const NeonGlow: React.FC<NeonGlowProps> = ({
  className,
  size = 200,
  color = "#b366ff",
  blur = 100,
}) => {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        boxShadow: `0 0 ${blur * 2}px ${blur}px ${color}40`,
      }}
    />
  );
};

export { NeonGlow }; 