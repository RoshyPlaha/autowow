"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RotatingPhrasesProps {
  phrases: string[];
  interval?: number; // in milliseconds
  className?: string;
}

const RotatingPhrases: React.FC<RotatingPhrasesProps> = ({
  phrases,
  interval = 3000, // 3 seconds default
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOut = () => {
      setIsVisible(false);
    };

    const fadeIn = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setIsVisible(true);
    };

    const timer = setInterval(() => {
      // Start fade out
      fadeOut();
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        fadeIn();
      }, 1000); // Half second for fade out
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <div                            

      className={cn(
        "transition-all duration-500 ease-in-out text-lg sm:text-2xl font-bold font-merriweather",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {phrases[currentIndex]}
    </div>
  );
};

export { RotatingPhrases }; 