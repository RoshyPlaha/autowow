"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";

const DummyPageContent = () => {
  const searchParams = useSearchParams();

  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "#b4b4b4";

  return (
    <div className="min-h-screen flex flex-col">
      <Header brandName={brandName} primaryColor={primaryColor} />

      <div className="flex-1 bg-black rounded-3xl mx-4 my-8 p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              This is a dummy page for {brandName}. Please contact us to update
              your website using Autoro.
            </h1>

            <p className="text-lg md:text-xl text-white">
              We are ready to help.
            </p>
          </div>
        </div>
      </div>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};



const DummyPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <DummyPageContent />
    </Suspense>
  );
};


export default DummyPage;
