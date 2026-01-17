"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";
import { TableStockDisplay } from "@/components/table-stock-display/page";
import { car } from "models/car_model";
import { useState, useEffect } from "react";

const AllStock = () => {
  const searchParams = useSearchParams();

  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "252525";

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [carResults, setCarResults] = useState<car[]>([]);

  useEffect(() => {
    const fetchCarData = async () => {
      const response = await fetch("/api/search-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "", brandName: brandName }),
      });

      if (response.status === 204) {
        setErrorMessage(
          "No cars found. Please contact support at rosh@autoro.space"
        );
        setCarResults([]);
        return;
      }

      const data = await response.json();
      setErrorMessage("");
      setCarResults(data.cars || []); // Extract the cars array from the response
    };
    
    fetchCarData();
  }, [brandName]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header brandName={brandName} primaryColor={primaryColor} />

      <div className="flex-1 px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <TableStockDisplay carResults={carResults} brandName={brandName} primaryColor={primaryColor} />
      </div>

      {errorMessage && (
        <div className="mx-auto mb-6 max-w-fit rounded-full border border-red-100 bg-red-50 px-5 py-2 text-sm font-medium text-red-700 shadow-sm text-center">
          {errorMessage}
        </div>
      )}

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};

const AllStockContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <AllStock />
    </Suspense>
  );
};

export default AllStockContent;
