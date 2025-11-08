"use client";

import { useState } from "react";

import { RainbowButton } from "@/components/ui/rainbow-button";

import { Footer } from "@/components/layout/footer";
import { RainbowText } from "@/components/ui/rainbow-text";

interface Car {
  id?: number;
  vin?: string;
  make: string;
  model: string;
  year: number;
  engine_cc?: number;
  color?: string;
  mileage?: number;
  price?: number;
  created_at?: Date;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [carResults, setCarResults] = useState<Car[]>([]);
  const [textInput, setTextInput] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);


  const handleTextInputChange = (value: string) => {
    setTextInput(value);
    setShowSearchButton(value.length > 0);
  };

  const handleSendMessage = async () => {
    console.log("searching cars");
    setIsLoading(true);

    try {
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
      <div
        id="top"
        className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden flex flex-col"
      >
        <div className="flex flex-col items-center justify-center text-center font-merriweather py-12">
          <RainbowText normalText="Autowow car" standoutText="search" />
        </div>

        <div className="flex flex-col items-center justify-center text-center font-merriweather py-12 px-12">
          <textarea
            value={textInput}
            onChange={(e) => handleTextInputChange(e.target.value)}
            placeholder="Type your car specification here...we'll handle the rest"
            className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
        </div>

        {showSearchButton && (
          <div className="flex-1 items-center justify-center text-center">
            <RainbowButton onClick={handleSendMessage}>
              {" "}
              Search Cars{" "}
            </RainbowButton>
          </div>
        )}

        {isLoading && <div> Loading... </div>}

        {carResults.length > 0 && (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Search Results ({carResults.length} cars)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carResults.map((car: Car) => (
                <div
                  key={car.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-lg font-semibold">
                    {car.make} {car.model}
                  </div>
                  <div className="text-sm text-gray-600">Year: {car.year}</div>
                  <div className="text-sm text-gray-600">
                    Color: {car.color}
                  </div>
                  <div className="text-sm text-gray-600">
                    Mileage: {car.mileage?.toLocaleString()} miles
                  </div>
                  <div className="text-sm text-gray-600">
                    Engine: {car.engine_cc}cc
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    £{car.price?.toLocaleString()}
                  </div>
                  {car.vin && (
                    <div className="text-xs text-gray-400 mt-1">
                      VIN: {car.vin}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
