"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BorderCardProps {
  className?: string;
  children?: ReactNode;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

const BorderCard: React.FC<BorderCardProps> = ({
  className,
  children,
  borderColor = "#b366ff",
  borderWidth = 1,
  borderRadius = 16,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center",
        className
      )}
      style={{
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {children}
    </div>
  );
};

export { BorderCard }; 