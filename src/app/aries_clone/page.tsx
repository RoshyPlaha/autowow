"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const examplePrompts = [
  "show me all petrol manual cars from before 2017 and less than 20,000 miles",
  "I need a budget car between £5000-£10000 thats newer than 2019",
  "all cars newer than 2018 and under £30000",
];

const Aries = () => {
  const searchParams = useSearchParams();

  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "#f4f4ed";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl] = useState<string>(
    process.env.NEXT_PUBLIC_BACKGROUND_VIDEO_URL + "aries_background.mov"
  );

  // Animated placeholder logic
  const typingDelay = useMemo(() => (isDeleting ? 35 : 80), [isDeleting]);
  const pauseBeforeDelete = 1800;
  const pauseBeforeNext = 600;

  useEffect(() => {
    // Only animate if textInput is empty

    const fullPrompt = examplePrompts[currentPromptIndex];

    if (!isDeleting && displayedPrompt === fullPrompt) {
      const pause = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayedPrompt.length === 0) {
      const pause = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPromptIndex((prev) => (prev + 1) % examplePrompts.length);
      }, pauseBeforeNext);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      const nextText = isDeleting
        ? fullPrompt.slice(0, displayedPrompt.length - 1)
        : fullPrompt.slice(0, displayedPrompt.length + 1);

      setDisplayedPrompt(nextText);
    }, typingDelay);

    return () => clearTimeout(timeout);
  }, [
    currentPromptIndex,
    displayedPrompt,
    isDeleting,
    pauseBeforeDelete,
    pauseBeforeNext,
    typingDelay,
  ]);
  // Handle video autoplay on mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        const playPromise = video.play();

        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        // Autoplay was prevented, try again on user interaction
        console.log("Autoplay prevented, will retry on interaction: ", error);

        const handleInteraction = async () => {
          try {
            await video.play();
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("click", handleInteraction);
          } catch (e) {
            console.log("Play failed:", e);
          }
        };

        document.addEventListener("touchstart", handleInteraction, {
          once: true,
        });
        document.addEventListener("click", handleInteraction, { once: true });
      }
    };

    // Try to play when video is loaded
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    // Also try on canplay event
    video.addEventListener("canplay", playVideo, { once: true });

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, [videoUrl]);

  

  return (
    <>
      {/* Aries Navbar */}
      <nav 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '16px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/aries_clone" className="text-2xl font-bold text-black" style={{ fontFamily: 'serif', letterSpacing: '-0.5px' }}>
            aries
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#home" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              home
            </Link>
            <Link href="#about" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              about us
            </Link>
            <Link href="#founders" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              for founders
            </Link>
            <Link href="#technology" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              technology
            </Link>
            <Link href="#group" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              group
            </Link>
            <Link href="#newsroom" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              newsroom
            </Link>
            <Link href="#careers" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }}>
              careers
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Join Us Button - Desktop */}
          <Link
            href="#join"
            className="hidden lg:block px-6 py-2 rounded-full border border-black text-sm text-gray-600 hover:text-black transition-colors"
            style={{ 
              fontFamily: 'sans-serif',
              borderRadius: '24px',
              borderWidth: '1px',
              textTransform: 'lowercase'
            }}
          >
            join us
          </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link href="#home" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                home
              </Link>
              <Link href="#about" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                about us
              </Link>
              <Link href="#founders" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                for founders
              </Link>
              <Link href="#technology" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                technology
              </Link>
              <Link href="#group" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                group
              </Link>
              <Link href="#newsroom" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                newsroom
              </Link>
              <Link href="#careers" className="text-sm text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'sans-serif', textTransform: 'lowercase' }} onClick={() => setIsMobileMenuOpen(false)}>
                careers
              </Link>
              <Link
                href="#join"
                className="mt-2 px-6 py-2 rounded-full border border-black text-sm text-gray-600 hover:text-black transition-colors text-center"
                style={{ 
                  fontFamily: 'sans-serif',
                  borderRadius: '24px',
                  borderWidth: '1px',
                  textTransform: 'lowercase'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                join us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Video Background */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Hero Header Section */}
      <section 
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden pt-32 z-10"
        style={{
          backgroundColor: videoUrl ? 'transparent' : '#0d2818',
          backgroundImage: videoUrl ? 'none' : `
            repeating-linear-gradient(
              0deg,
              rgba(13, 40, 24, 0.9) 0px,
              rgba(20, 60, 30, 0.7) 2px,
              rgba(13, 40, 24, 0.9) 4px,
              rgba(25, 70, 35, 0.6) 6px,
              rgba(13, 40, 24, 0.9) 8px,
              rgba(18, 55, 28, 0.5) 10px
            ),
            repeating-linear-gradient(
              3deg,
              rgba(15, 45, 25, 0.8) 0px,
              rgba(13, 40, 24, 0.95) 3px,
              rgba(22, 65, 32, 0.7) 6px,
              rgba(13, 40, 24, 0.9) 9px,
              rgba(20, 60, 30, 0.6) 12px
            )
          `
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white" style={{ fontFamily: 'sans-serif', fontWeight: 700 }}>
            Play bigger.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'monospace', textAlign: 'left' }}>
            Aries Global is the permanent home for<br />
            passionate founders, helping transform<br />
            strong software products into enduring AI-<br />
            native platforms.
          </p>
        </div>
      </section>

      {/* Content Section - White Background */}
      <section className="relative w-full bg-white py-20 md:py-32 px-4 md:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Centered */}
          <div className="text-center mb-24 md:mb-32">
            <h2 
              className="text-5xl md:text-7xl font-bold mb-8"
              style={{ 
                color: '#0d2818',
                fontFamily: 'sans-serif',
                background: 'linear-gradient(135deg, #0d2818 0%, #1a4d2e 50%, #0d2818 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Power for your purpose
            </h2>
            <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-3xl mx-auto" style={{ fontFamily: 'sans-serif' }}>
              We acquire established, founder-led companies and help you scale by enhancing product strengths and supercharging go-to-market.
            </p>
            <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto" style={{ fontFamily: 'sans-serif' }}>
              Powered by a shared AI growth engine and guided by respect for your legacy, and customer trust.
            </p>
          </div>

          {/* Bottom Section - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'sans-serif' }}>
                Our Principles
              </h3>
            </div>
            <div>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                Aries exists to help founders and their teams go further, faster. Together, we move past plateaus and build enduring value for decades to come. Here is how we operate:
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </>
  );
};

const AriesContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <Aries />
    </Suspense>
  );
};

export default AriesContent;
