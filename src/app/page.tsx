"use client";

import { useMemo, useState } from "react";
import { car } from "models/car_model";
import { Footer } from "@/components/layout/footer";
import { DisplayExamplePrompt } from "@/components/display-example-prompt/display-example-prompt";
import { Header } from "@/components/layout/header";

const formatPrice = (price: number | undefined): string => {
  if (!price) return "";
  return Math.round(price).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  });
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [carResults, setCarResults] = useState<car[]>([]);
  const [textInput, setTextInput] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const isSearchDisabled = useMemo(
    () => textInput.trim().length === 0 || isLoading,
    [textInput, isLoading]
  );

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
        body: JSON.stringify({ message: textInput }),
      });

      const data = await response.json();
      console.log("data", data);
      setCarResults(data.cars || []); // Extract the cars array from the response
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCarResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        className="fixed right-0 top-0 h-full w-3/4 sm:w-2/3 md:w-2/5 lg:w-1/3 bg-contain bg-right bg-no-repeat z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/car-background.png')",
        }}
      />
      <div
        id="top"
        className="relative min-h-screen w-full overflow-hidden flex flex-col pb-48 px-4 md:px-6 lg:px-8 z-10"
      >
        <div className="flex flex-col items-center justify-center text-center font-merriweather py-12">
          <h1 className="text-2xl md:text-4xl font-bold font-merriweather">
            Find the exact car you&apos;re looking for in seconds
          </h1>
        </div>
        <div className="mx-auto mb-6 max-w-fit rounded-full border border-blue-100 bg-green-50 px-5 py-2 text-sm font-medium text-green-700 shadow-sm text-center">
          This is a beta product. Send feedback to roshsplaha@gmail.com
        </div>

        {carResults.length === 0 && <DisplayExamplePrompt />}

        {carResults.length > 0 && (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Search Results ({carResults.length} cars)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carResults.map((car: car) => (
                <div
                  key={car.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4 bg-white/50 backdrop-blur-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold">
                      {car.make} {car.model}
                    </div>
                    <div className="text-sm text-gray-600">
                      Year: {car.year}
                    </div>
                    <div className="text-sm text-gray-600">
                      Color: {car.color}
                    </div>
                    <div className="text-sm text-gray-600">
                      Mileage: {car.mileage?.toLocaleString()} miles
                    </div>
                    <div className="text-sm text-gray-600">
                      Gearbox: {car.gearbox}
                    </div>
                    <div className="text-sm text-gray-600">
                      Fuel Type: {car.fuel_type}
                    </div>
                    <div className="text-lg font-bold text-green-600 mt-2">
                      £{formatPrice(car.price)}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-36 h-36 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/Default-Car.png"
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
                    "linear-gradient(130deg, rgba(238,238,238,0.95) 35%, rgba(180, 192, 254, 0.95) 50%, rgba(238,238,238,0.95) 65%)",
                  backgroundSize: "200% 100%",
                  animation: "searchShimmer 1.2s ease-in-out infinite",
                }
              : undefined
          }
        >
          <textarea
            value={textInput}
            onChange={(e) => handleTextInputChange(e.target.value)}
            placeholder="Type your car specification here...we'll handle the rest"
            className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
            rows={2}
          />
          <div className="search-history mt-3 flex items-center justify-between gap-3">
            <div className="flex flex-1 gap-2 overflow-hidden">
              <div className="w-full max-h-24 overflow-y-auto rounded-2xl border border-gray-200 bg-white/90 p-2 text-left text-xs text-gray-600">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  <span>Search history</span>
                  {searchHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSearchHistory([])}
                      className="text-[10px] font-normal uppercase text-green-500 hover:text-green-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {searchHistory.map((entry, index) => (
                    <button
                      key={`${entry}-${index}`}
                      onClick={() => setTextInput(entry)}
                      className="w-full truncate rounded-xl px-3 py-1 text-left transition hover:bg-blue-50 hover:text-blue-700"
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#122614] text-white shadow-lg transition hover:bg-[#122614] disabled:cursor-not-allowed disabled:bg-[#122614]  disabled:opacity-60"
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
      <Footer />

      <style jsx>{`
        @keyframes searchShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}
