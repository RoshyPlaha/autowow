"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AUTH_STATUS_CHANGED } from "@/lib/auth-events";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const newLoginState = !!token && !!tokenExpiry && Date.now() < parseInt(tokenExpiry);
      
      // Only update state if it's different
      if (newLoginState !== isLoggedIn) {
        setIsLoggedIn(newLoginState);
      }
    };

    const handleAuthChange = (event: CustomEvent<boolean>) => {
      console.log("Auth status changed:", event.detail); // Debug log
      if (event.detail !== isLoggedIn) {  // Only update if different
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

  return (
    <div className="w-full h-16 flex items-center px-8 relative z-50 bg-white/50">
      <nav className="flex gap-4">
        <Link href="/" className="hover:opacity-80 text-black">
          Home
        </Link>
        <Link href="/pricing" className="hover:opacity-80 text-black">
          Pricing
        </Link>
        {/* <Link
          href="/account"
          className="hover:opacity-80 text-black justify-right"
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </Link> */}
        <Link href="/blog" className="hover:opacity-80 text-black">
          Blog
        </Link>
        <Link href="/about" className="hover:opacity-80 text-black">
          About
        </Link>
      </nav>
    </div>
  );
};
