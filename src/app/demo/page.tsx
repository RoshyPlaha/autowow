"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { car } from "models/car_model";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { TableStockDisplay } from "@/components/table-stock-display/page";
import { useSearchParams } from "next/navigation";

const examplePrompts = [
  "show me all petrol manual cars from before 2017 and less than 20,000 miles",
  "I need a budget car between £5000-£10000 thats newer than 2019",
  "all cars newer than 2018 and under £30000",
];

const Demo = () => {
  const searchParams = useSearchParams();

  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "#f4f4ed";

  const [isLoading, setIsLoading] = useState(false);
  const [carResults, setCarResults] = useState<car[]>([]);
  const [textInput, setTextInput] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>(
    process.env.NEXT_PUBLIC_BACKGROUND_VIDEO_URL + "Vortex" + ".mp4"
  );

  const isSearchDisabled = useMemo(
    () => textInput.trim().length === 0 || isLoading,
    [textInput, isLoading]
  );

  // Animated placeholder logic
  const typingDelay = useMemo(() => (isDeleting ? 35 : 80), [isDeleting]);
  const pauseBeforeDelete = 1800;
  const pauseBeforeNext = 600;

  useEffect(() => {
    // Only animate if textInput is empty
    if (textInput.length > 0) {
      setDisplayedPrompt("");
      return;
    }

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
    textInput,
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

  const handleTextInputChange = (value: string) => {
    setTextInput(value);
  };

  const handleSendMessage = async () => {
    console.log("searching cars");
    setIsLoading(true);

    try {
      const trimmedInput = textInput.trim();

      if (trimmedInput.length > 0) {
        setSearchHistory((prev) => {
          const nextHistory = prev.filter((entry) => entry !== trimmedInput);
          nextHistory.unshift(trimmedInput);
          return nextHistory.slice(0, 10);
        });
      }

      const response = await fetch("/api/search-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textInput, brandName: brandName }),
      });

      if (response.status === 204) {
        console.warn("no cars found for query: ", textInput);
        setErrorMessage(
          "No cars found for your query. Please contact support at rosh@autoro.space"
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("data", data);
      setErrorMessage("");
      setCarResults(data.cars || []); // Extract the cars array from the response

      // Stop video and show white background when results are shown
      if (data.cars && data.cars.length > 0) {
        setVideoUrl("");

        // Stop the video element if it exists
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }

        // Scroll to top when results are shown
        const topElement = document.getElementById("header-container");
        if (topElement) {
          topElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCarResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header brandName={brandName} primaryColor={primaryColor} />
      {videoUrl ? (
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
      ) : (
        <div className="fixed inset-0 w-full h-full bg-white z-0 pointer-events-none" />
      )}
      <div
        id="top"
        className="relative min-h-screen w-full overflow-hidden flex flex-col pb-48 px-4 md:px-6 lg:px-8 z-10"
      >
        <div className="flex flex-col items-center justify-center text-center font-merriweather py-12">
          <h1 className="text-2xl md:text-4xl font-bold font-merriweather text-white">
            Find your next car in seconds
          </h1>
        </div>

        <p className="text-center text-white">
          This is a demo product only. Contact rosh@autoro.space for more information.
        </p>

        {errorMessage && (
          <div className="mx-auto mb-6 max-w-fit rounded-full border border-red-100 bg-red-50 px-5 py-2 text-sm font-medium text-red-700 shadow-sm text-center">
            {errorMessage}
          </div>
        )}

        <TableStockDisplay
          carResults={carResults}
          brandName={brandName}
          primaryColor={primaryColor}
        />
      </div>
      <div
        id="search-navigation"
        className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          id="search-navigation"
          className="pointer-events-auto w-full max-w-3xl rounded-3xl border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur transition-[background-position]"
          style={
            isLoading
              ? {
                  background:
                    "linear-gradient(130deg, rgba(238,238,238,0.95) 35%, rgba(114, 129, 170, 0.95) 50%, rgba(238,238,238,0.95) 65%)",
                  backgroundSize: "200% 100%",
                  animation: "searchShimmer 1.2s ease-in-out infinite",
                }
              : undefined
          }
        >
          <div className="relative">
            <textarea
              value={textInput}
              onChange={(e) => handleTextInputChange(e.target.value)}
              className="w-full resize-none rounded-2xl border border-gray-200 text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent relative z-10"
              rows={2}
            />
            {textInput.length === 0 && displayedPrompt && (
              <div className="absolute inset-0 flex items-center px-4 py-3 pointer-events-none text-black z-0">
                <span>
                  {displayedPrompt}
                  <span className="typing-cursor ml-1 inline-block w-0.5 h-4 bg-gray-400 align-middle" />
                </span>
              </div>
            )}
          </div>
          <div className="search-history mt-3 flex items-center justify-between gap-3">
            <div className="flex flex-1 gap-2 overflow-hidden">
              <div className="w-full max-h-24 overflow-y-auto rounded-2xl border border-gray-200 bg-white/90 p-2 text-left text-xs text-gray-600">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  <span>Search history</span>
                  {searchHistory.length > 0 && (
                    <Button
                      type="button"
                      onClick={() => setSearchHistory([])}
                      className="text-[10px] font-normal uppercase blue-green-500 hover:blue-green-600"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {searchHistory.map((entry, index) => (
                    <button
                      key={`${entry}-${index}`}
                      onClick={() => setTextInput(entry)}
                      className="w-full truncate rounded-xl px-3 py-1 text-left transition hover:bg-green-50 hover:text-green-700"
                      type="button"
                    >
                      {entry}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSendMessage}
                disabled={isSearchDisabled}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5296c6] text-white shadow-lg transition hover:bg-[#122614] disabled:cursor-not-allowed disabled:bg-[#122614]  disabled:opacity-60"
                aria-label="Search cars"
              >
                {isLoading ? (
                  <span className="animate-pulse text-sm">...</span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer brandName={brandName} primaryColor={primaryColor} />

      <style jsx>{`
        @keyframes searchShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .typing-cursor {
          animation: blink 1.1s steps(1, start) infinite;
        }
      `}</style>
    </>
  );
}

const DemoContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <Demo />
    </Suspense>
  );
}

export default DemoContent;

