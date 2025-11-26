"use client";
import { useState, useEffect } from "react";
import { AUTH_STATUS_CHANGED } from "@/lib/auth-events";
import Image from "next/image";

export const Header = ({ brandName, primaryColor }: { brandName: string, primaryColor: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const newLoginState =
        !!token && !!tokenExpiry && Date.now() < parseInt(tokenExpiry);

      // Only update state if it's different
      if (newLoginState !== isLoggedIn) {
        setIsLoggedIn(newLoginState);
      }
    };

    const handleAuthChange = (event: CustomEvent<boolean>) => {
      console.log("Auth status changed:", event.detail); // Debug log
      if (event.detail !== isLoggedIn) {
        // Only update if different
        setIsLoggedIn(event.detail);
      }
    };

    // Initial check
    checkLoginStatus();

    // Add event listeners
    window.addEventListener(
      AUTH_STATUS_CHANGED,
      handleAuthChange as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        AUTH_STATUS_CHANGED,
        handleAuthChange as EventListener
      );
    };
  }, [isLoggedIn]); // Add isLoggedIn to dependencies

  // Convert hex to rgba with 50% opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      className="w-full h-28 flex items-center px-16 relative z-50 text-white"
      style={{
        backgroundColor: hexToRgba(primaryColor, 0.5),
      }}
    >
      <nav className="flex gap-4">
        <Image
          src={`/assets/logos/${brandName}.png`}
          alt="Autoro"
          width={300}
          height={300}
        />
      </nav>
    </div>
  );
};
