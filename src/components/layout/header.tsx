"use client";
import { useState, useEffect } from "react";
import { AUTH_STATUS_CHANGED } from "@/lib/auth-events";
import Image from "next/image";
import NavigationLink from "../page-animation/transition-link";

export const Header = ({
  brandName,
  primaryColor,
}: {
  brandName: string;
  primaryColor: string;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      id="header-container"
      className="w-full h-28 flex items-center justify-between px-4 md:px-16 relative z-50 text-white"
      style={{
        backgroundColor: hexToRgba(primaryColor, 0.5),
      }}
    >
      <nav className="flex gap-4">
        <NavigationLink href={`/`}>
          <Image
            src={`/assets/logos/${brandName}.png`}
            alt="Autoro"
            width={300}
            height={300}
            className="w-auto h-12 md:h-auto"
          />
        </NavigationLink>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <NavigationLink
          href={`/`}
          className="px-6 py-3 text-left text-white-100transition-coƒlors"
        >
          Home
        </NavigationLink>
        <NavigationLink
          href={`/dummy?brandName=${brandName}&primaryColor=${primaryColor}`}
          className="px-6 py-3 text-left text-white-100 transition-colors"
        >
          Dummy Button 1
        </NavigationLink>
        <NavigationLink
          href={`/dummy?brandName=${brandName}&primaryColor=${primaryColor}`}
          className="px-6 py-3 text-left text-white-100 transition-colors"
        >
          Dummy Button 2
        </NavigationLink>
        <NavigationLink
          href={`/dummy?brandName=${brandName}&primaryColor=${primaryColor}`}
          className="px-6 py-3 text-left text-white-100 transition-colors"
        >
          Dummy Button 3
        </NavigationLink>
        <NavigationLink
          href={`/valuation?brandName=${brandName}&primaryColor=${primaryColor}`}
          className="px-6 py-3 text-left text-white-100 transition-colors"
        >
          Free Car Valuation
        </NavigationLink>
      </nav>

      {/* Mobile Burger Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-white transition-all ${
            isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg md:hidden">
          <nav className="flex flex-col py-4">
            <NavigationLink
              href={`/`}
              className="px-6 py-3 text-left text-white-100transition-coƒlors"
            >
              Home
            </NavigationLink>
            <button
              className="px-6 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => {
                console.log("About Us clicked");
                setIsMobileMenuOpen(false);
              }}
            >
              Dummy Button 1
            </button>
            <NavigationLink
              href={`/valuation?brandName=${brandName}&primaryColor=${primaryColor}`}
              className="px-6 py-3 text-left text-white-100 bg-green-900 transition-colors"
            >
              Free Car Valuation
            </NavigationLink>
          </nav>
        </div>
      )}
    </div>
  );
};
