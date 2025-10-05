"use client";

import { RainbowButton } from "../ui/rainbow-button";
import { RainbowText } from "../ui/rainbow-text";
import Image from "next/image";

interface LandingPageProps {
  heroTextProps: {
    normalText: string;
    standoutText: string;
    tagline: string;
  };
  displayImageProps: {
    relativeUrl: string;
  };
  secondaryHeroTextProps: {
    normalText: string;
    standoutText: string;
  };
  descriptionPropOne: {
    title: string;
    description: string;
  };
  descriptionPropTwo: {
    title: string;
    description: string;
  };
  clickToAction: {
    href: string;
    buttonText: string;
  };
}

export const LandingPage = (props: LandingPageProps) => {
  const { heroTextProps, displayImageProps, secondaryHeroTextProps, descriptionPropOne, descriptionPropTwo, clickToAction } = props;
  
  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-[1200px] mx-auto ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center text-3xl md:text-4xl lg:text-5xl pb-12 pt-20 md:pt-0">
            <RainbowText
              normalText={heroTextProps.normalText}
              standoutText={heroTextProps.standoutText}
            />
            <p className="text-sm md:text-2xl pt-4">
              {heroTextProps.tagline}
            </p>
          </div>
          <RainbowButton
            onClick={() => window.location.href = clickToAction.href}
          >
            <div className="flex justify-center pt-2 md-2 mb-2 text-white">
              {clickToAction.buttonText}
            </div>
          </RainbowButton>
        </div>
        <div className="relative flex justify-end h-full">
          <Image
            src={displayImageProps.relativeUrl}
            alt="Capsules"
            className="object-contain h-[80vh]"
            width={1200}
            height={1200}
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </main>
      <main className="pt-0">
        <div className="flex flex-col md:flex-row px-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="max-w-1xl mx-auto text-center px-8 py-6 leading-relaxed">
            <div className="flex flex-col p-6 mx-auto w-full max-w-[700px] self-start">
              <RainbowText
                normalText={secondaryHeroTextProps.normalText}
                standoutText={secondaryHeroTextProps.standoutText}
              />
            </div>
            <div
              id="block-text"
              className="flex flex-col border-2 border-[#6699ff]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(102,153,255,0.2)] backdrop-blur-sm bg-white/5 mb-8"
            >
              <h1 className="text-2xl md:text-4xl text-left font-bold">
                {descriptionPropOne.title}
              </h1>
              <p className="text-xs md:text-sm pt-4 text-left text-gray-600">
                {descriptionPropOne.description}
              </p>
            </div>
            <div
              id="block-text"
              className="flex flex-col border-2 border-[#6699ff]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(102,153,255,0.2)] backdrop-blur-sm bg-white/5"
            >
              <h1 className="text-2xl md:text-4xl text-left font-bold">
                {descriptionPropTwo.title}
              </h1>
              <p className="text-xs md:text-sm pt-4 text-left text-gray-600">
               {descriptionPropTwo.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
