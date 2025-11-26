"use client";

import { Header } from "@/components/layout/header";
import Meteors from "@/components/ui/meteors";
import { RainbowText } from "@/components/ui/rainbow-text";
import Link from "next/link";

const COMPANY_NAME = "Autoro";
const primaryColor = "#122614";

export default function PageNotFound() {
  return (
    <div
      id="top"
      className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden"
    >
      <Header brandName={COMPANY_NAME} primaryColor={primaryColor} />
      <Meteors number={20} />
      <div className="flex flex-col md:flex-row min-h-screen pt-20 md:pt-0 px-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="max-w-1xl mx-auto text-center px-8 py-6 leading-relaxed">
          <div className="flex flex-col p-6 mx-auto w-full max-w-[700px] self-start">
            <RainbowText normalText="Oops! That page " standoutText="does not exist" />
          </div>{" "}
          <p>
            The page you are looking for does not exist. Please check the URL
            and try again. Or head back to the <Link href="/">home page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
