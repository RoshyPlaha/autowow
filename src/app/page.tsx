"use client";

import { Header } from "@/components/layout/header_default";
import { Footer } from "@/components/layout/footer";
import DashboardExample from "@/components/dashboard-example/dashboard-example";
import VideoExample from "@/components/video-example/video-example";
import Link from "next/link";

const COMPANY_NAME = "AR";
const primaryColor = "#09293c";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-merriweather bg-white">
      <Header brandName={COMPANY_NAME} primaryColor={primaryColor} />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Text */}
          <div className="space-y-6 order-1 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] leading-tight font-merriweather">
              AI powered car dealer website builder
            </h1>
            <p className="text-lg md:text-xl text-[#1a3266] font-merriweather">
              Create stunning, professional car dealership websites using AI
              natural-language car search queries
            </p>
          </div>

          {/* Right Side - Video */}
          <div className="w-full order-2 lg:order-2 flex items-center justify-center">
            <VideoExample />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#e6f2ff]">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
          {/* Right Side - Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] leading-tight font-merriweather ">
              Intelligent insights
            </h1>
            <p className="text-lg md:text-xl text-[#1a3266] font-merriweather">
              See customers search patterns to inform stock decisions and
              highlight buying intent trends. This is the future of the web.
            </p>
          </div>

          {/* Left Side - Dashboard */}
          <div className="w-full order-2 lg:order-1 bg-white rounded-lg overflow-hidden shadow-lg">
            <DashboardExample />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
          {/* Right Side - Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] leading-tight font-merriweather ">
              About Autoro
            </h1>
            <p className="text-lg md:text-xl text-[#1a3266] font-merriweather">
              An independent car website host & designer, specialising in
              creating modern, high-impact automotive websites built for the new
              era of AI. We focus on delivering engaging, powerful search
              functionality that helps customers find the right vehicle faster
              and with greater confidence. We design, host, and fully run our
              clients&apos; websites, providing a complete end-to-end service.{" "}
              <br />
              <br />
              Alongside design and development, we deliver tailored Business
              Intelligence dashboards that reveal clear insights into user
              behaviour and website performance. <br />
              <br />
              By working closely with clients, we help refine content, optimise
              engagement, and create a premium look and feel that drives
              results. <br />
              <br />
              All software is developed and operated in-house, allowing for
              transparent pricing and costs that are often significantly lower
              than competitors—without compromising on performance, flexibility,
              or quality.
            </p>
          </div>

          {/* Left Side - Dashboard */}
          <div className="w-full order-2 lg:order-1 bg-white text-center align-center justify-center items-center">
            <Link
              href={`/auto2000`}
              className="px-6 py-3 text-left text-white bg-green-900 transition-colors inline-block"
            >
              Demo Here
            </Link>
          </div>
        </div>
      </div>

      <Footer brandName={COMPANY_NAME} primaryColor={primaryColor} />
    </div>
  );
}
