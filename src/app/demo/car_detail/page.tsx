"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

const CarDetail = () => {
  const searchParams = useSearchParams();

  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "#f4f4ed";

  // Mock car data
  const carData = {
    make: "BMW ",
    model: "M4",
    price: "UNDER OFFER",
    colour: "White",
    interior: "Black Alcantara",
    year: "2023 (23)",
    mileage: "107 Miles",
    engine: "4.0L V6",
    transmission: "7-Speed Sequential",
    bodyStyle: "Coupe",
    fuel: "Petrol",
    image: "/assets/car_default_2.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header brandName={brandName} primaryColor={primaryColor} />

      <div className="flex-1 relative flex items-center justify-center">
        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto">
          {/* Back to Results Link */}
          <div className="px-4 md:px-8 pt-6 pb-4">
            <Link
              href={`all_stock?brandName=${brandName}&primaryColor=${primaryColor}`}
              className="text-gray-700 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>BACK TO RESULTS</span>
            </Link>
          </div>

          {/* Car Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 pb-12 items-center">
            {/* Left: Car Image */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={carData.image}
                  alt={`${carData.make} ${carData.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Dealership Badge */}
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded">
                <span className="text-sm font-semibold text-black">
                  {brandName.toUpperCase()} INTERNATIONAL
                </span>
              </div>
            </div>

            {/* Right: Car Details */}
            <div className="flex flex-col justify-start pt-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 font-merriweather">
                {carData.make} {carData.model}
              </h1>

              {/* Specifications */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">PRICE:</span>
                  <span className="text-black font-semibold">
                    {carData.price}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">COLOUR:</span>
                  <span className="text-black font-semibold">
                    {carData.colour}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">INTERIOR:</span>
                  <span className="text-black font-semibold">
                    {carData.interior}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">YEAR:</span>
                  <span className="text-black font-semibold">
                    {carData.year}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">MILEAGE:</span>
                  <span className="text-black font-semibold">
                    {carData.mileage}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">ENGINE:</span>
                  <span className="text-black font-semibold">
                    {carData.engine}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">
                    TRANSMISSION:
                  </span>
                  <span className="text-black font-semibold">
                    {carData.transmission}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">BODY STYLE:</span>
                  <span className="text-black font-semibold">
                    {carData.bodyStyle}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 font-medium">FUEL:</span>
                  <span className="text-black font-semibold">
                    {carData.fuel}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors">
                  ENQUIRE NOW
                </button>
                <button className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors">
                  FINANCE CALCULATOR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};

const CarDetailContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <CarDetail />
    </Suspense>
  );
};

export default CarDetailContent;
