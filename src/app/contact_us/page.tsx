"use client";

import { useSearchParams } from "next/navigation";
import Nav from "@/components/navigation/navigation";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";

const ContactUsContent = () => {
  const searchParams = useSearchParams();
  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "09293c";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />

      {/* Header Section with Background */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {/* Background Image - using a dark gradient as placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-merriweather">
            Contact AutoRo
          </h1>
          <div className="w-24 h-0.5 bg-white"></div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 bg-gray-50">
        <div className="w-full max-w-4xl">
          <div>
            <div className="bg-white border border-black p-8 md:p-12 shadow-lg">
              {/* Form Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-merriweather">
                  Get in touch with us by emailing rosh@autoro.space or
                  contacting +447718215606.

                  <br/>
                  <br/>
                  We&apos;re ready to help level up your car dealership.
                </h2>
                <div className="w-24 h-0.5 bg-black mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};

const ContactUs = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <ContactUsContent />
    </Suspense>
  );
};

export default ContactUs;
