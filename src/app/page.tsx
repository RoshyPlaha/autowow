"use client";

import { Footer } from "@/components/layout/footer_default";
import DashboardExample from "@/components/dashboard-example/dashboard-example";
import WebsiteVideoExample from "@/components/video-example/video-example";
import FeaturesPage from "@/components/features/page";
import DemoButton from "@/components/button/demo";
import SearchBarExample from "@/components/video-example/search-bar-example";
import Nav from "@/components/navigation/navigation";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-merriweather bg-white">
      <Nav />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-8 py-8 md:py-8 bg-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Text */}
          <div className="relative z-10 max-w-7xl w-full px-4 md:px-8 lg:px-8 py-8 md:py-8">
            <div className="max-w-4xl">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a3266] leading-tight font-merriweather mb-6">
                AI Powered Websites for Car Dealers
              </h1>

              {/* Descriptive Paragraph */}
              <div className="mb-12 max-w-3xl">
                <p className="text-base md:text-lg lg:text-xl text-[#1a3266] font-merriweather mb-6 leading-relaxed">
                  Autoro is run by passionate car and technology enthusiasts. We
                  are proud to provide:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-base md:text-lg lg:text-xl text-[#1a3266] font-merriweather leading-relaxed">
                  <li>
                    AI-powered websites that are provide natural language search
                    across your stock
                  </li>
                  <li>
                    Deep analytics on how customers are searching your platform
                  </li>
                  <li>Simplified advert posting linked to social media</li>
                  <li>
                    Transparent pricing for all, no matter your stock size
                  </li>
                </ol>
              </div>

              {/* Pricing Information */}
              <div className="flex flex-col md:flex-row items-start md:items-baseline gap-2">
                <span className="text-2xl md:text-3xl lg:text-4xl text-[#1a3266] font-merriweather">
                  From
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a3266] font-merriweather relative">
                    £40
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white"></span>
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl text-[#1a3266]  font-merriweather align-super">
                    + VAT
                  </span>
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl text-[#1a3266] font-merriweather">
                  /month
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="w-full order-2 lg:order-2 items-center justify-center">
            <WebsiteVideoExample />
            <DemoButton />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#e6f2ff]">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
          {/* Right Side - Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] leading-tight font-merriweather ">
              Intelligent Insights
            </h1>
            <p className="text-lg md:text-xl text-[#1a3266] font-merriweather">
              Existing car dealer analytics do not give you the insights you
              need to grow your business. <br></br>
              <br></br>AutoRo provides you with customer analytics and search
              patterns to inform stock decisions and highlight buying intent
              trends. <br></br>
              <br></br>Get a monthly generated report on your website
              performance including in our transparent pricing.
              <br></br>This is the future of the web.
            </p>
          </div>

          {/* Left Side - Dashboard */}
          <div className="w-full order-2 lg:order-1 bg-white rounded-lg overflow-hidden shadow-lg">
            <DashboardExample />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-center items-center px-4 md:px-8 lg:px-8 py-8 md:py-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
          <h3 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#1a3266] leading-tight font-merriweather ">
            An intuitive and engaging way for customers to search your stock.
          </h3>
          <div className="w-full order-2 lg:order-2 items-center justify-center">
            <SearchBarExample />
          </div>
        </div>
      </div>
      <FeaturesPage />

      <div
        id="about"
        className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-8 py-8 md:py-8 bg-white"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 gap-12 lg:gap-12">
          <div className="space-y-6 order-1 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3266] leading-tight font-merriweather">
              AI powered car dealer website builder
            </h1>
            <h3 className="text-2xl md:text-2xl lg:text-2xl font-bold text-[#1a3266] leading-tight font-merriweather">
              About Autoro
            </h3>
            <p className="text-lg md:text-xl text-[#1a3266] font-merriweather">
              Autoro is disrupting the car dealer website market by providing a
              modern, AI-powered website builder that is easy to use and
              affordable.
            </p>
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
        </div>
      </div>

      <DemoButton />
      <Footer />
    </div>
  );
}
