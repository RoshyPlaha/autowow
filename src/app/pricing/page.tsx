"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PricingGradient } from "@/components/pricing/pricing-gradient";
import { RainbowText } from "@/components/ui/rainbow-text";

export default function Page() {
  return (
    <div
      id="top"
      className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden"
    >
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen pt-20 md:pt-0 px-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="max-w-1xl mx-auto text-center px-8 py-6 leading-relaxed">
          <div className="flex flex-col p-6 mx-auto w-full max-w-[700px] self-start">
            <RainbowText normalText="Choose Your Duration for " standoutText="capsules.today" />
          </div>{" "}
          <div className="flex flex-col items-center justify-center mb-4 px-8 max-w-[1200px]">
            <PricingGradient
              title="All videos are encrypted and locked in our digital vault"
              subheading=""
            />
          </div>
          <p className="text-sm text-gray-600">
            Pricing is based on how long we capsule your video for. The longer you need to securely lock you memory away, the more expensive it is.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
