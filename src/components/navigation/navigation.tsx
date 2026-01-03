"use client";

import Image from "next/image";
import { useState } from "react";
import TransitionLink from "../page-animation/transition-link";

const primaryColor = "#09293c";
const COMPANY_NAME = "AR";

const Nav = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to features section
  const scrollToElement = (elementId: string) => {
    const featuresElement = document.getElementById(elementId);
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      id="header-container"
      className="w-full h-28 flex items-center justify-between px-4 md:px-16 relative z-50 text-white"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <nav className="flex gap-4">
        <TransitionLink href={`/`}>
          <Image
            src={`/assets/logos/${COMPANY_NAME}.png`}
            alt="Autoro"
            width={180}
            height={180}
            className="w-auto h-12 md:h-auto"
          />
        </TransitionLink>
      </nav>
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
          onClick={() => console.log("Contact Us clicked")}
        >
          Contact: +44 7718215606
        </button>
        <TransitionLink
          href={`/blog`}
          className="hidden md:block px-4 py-2 text-left text-white-100 bg-blue-900 transition-colors"
        >
          Blog
        </TransitionLink>
        <button
          className="hidden px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
          onClick={() => scrollToElement("packages")}
        >
          Packages
        </button>
        <button
          className="hidden px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
          onClick={() => scrollToElement("about")}
        >
          About Us
        </button>
        <TransitionLink
          href={`/demo?brandName=vortex&primaryColor=#252525`}
          className="hidden md:block px-4 py-2 text-left text-white-100 bg-green-900 transition-colors"
        >
          See a Demo Here
        </TransitionLink>
      </div>

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
            <TransitionLink
              href={`/blog`}
              className="px-6 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
            >
              Blog
            </TransitionLink>
            <TransitionLink
              href={`/demo?brandName=vortex&primaryColor=#252525`}
              className="px-6 py-3 text-left text-white-100 bg-green-900 transition-colors"
            >
              Demo
            </TransitionLink>
            <button
              className="px-6 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => scrollToElement("about")}
            >
              About Us
            </button>
            <button
              className="px-6 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => {
                console.log("Contact Us clicked");
                setIsMobileMenuOpen(false);
              }}
            >
              Contact Us
            </button>
            <button
              className="px-6 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => scrollToElement("packages")}
            >
              Packages
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Nav;
