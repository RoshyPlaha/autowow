"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const ValuationPage = ({
  searchParams,
}: {
  searchParams: {
    brandName: string;
    primaryColor: string;
  };
}) => {
  const [registration, setRegistration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<any>(null);

  const handleValuation = async () => {
    if (!registration.trim()) return;

    setIsLoading(true);
    try {
      // Mock endpoint - replace with actual API call later
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registration: registration.trim() }),
      });

      const data = await response.json();
      setValuationResult(data);
    } catch (error) {
      console.error("Error fetching valuation:", error);
      // Mock response for now
      setValuationResult({
        estimatedValue: "£12,500",
        message: "Valuation complete (mock data)",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const brandName = searchParams?.brandName || "AR";
  const primaryColor = searchParams?.primaryColor || "#b4b4b4";

  return (
    <div className="min-h-screen flex flex-col">
      <Header brandName={brandName} primaryColor={primaryColor} />

      <div className="flex-1 bg-yellow-400 rounded-3xl mx-4 my-8 p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Sell my car to {brandName}.
              <br />
              Fast, fair and no fuss.
            </h1>

            <p className="text-lg md:text-xl text-gray-900">
              Call {brandName} on 01234 567890 to follow up on the valuation.
            </p>

            {/* Input and Button Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={registration}
                onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                placeholder="ENTER REG"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                maxLength={8}
              />
              <button
                onClick={handleValuation}
                disabled={isLoading || !registration.trim()}
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    Value your car
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Valuation Result */}
            {valuationResult && (
              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-900">
                <p className="text-lg font-semibold text-gray-900">
                  Dummy Value: {valuationResult.estimatedValue}
                </p>
                {valuationResult.message && (
                  <p className="text-sm text-gray-600 mt-1">
                    {valuationResult.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};

export default ValuationPage;
