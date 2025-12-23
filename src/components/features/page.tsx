const FeaturesPage = () => {
  return (
    <div
      id="packages"
      className="flex-1 flex items-start justify-center px-4 md:px-8 lg:px-8 py-8 md:py-8 bg-[#e6f2ff]"
    >
      <div className="max-w-7xl w-full">
        <h3 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#1a3266] leading-tight font-merriweather ">
          We offer a tailored package to host your website, display and market your brand.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-r border-gray-200">
          {/* Left Column - Features */}
          <div className="border-r border-gray-200 p-6 md:p-8">
            <div className="bg-[#1a3266] text-white px-4 py-3 mb-4">
              <h3 className="text-xl md:text-2xl font-bold font-merriweather">
                Features
              </h3>
            </div>
            <p className="text-sm md:text-base font-bold text-[#1a3266] font-merriweather mb-4 uppercase">
              Everything you need
            </p>
            <ul className="space-y-3 text-base md:text-lg text-[#1a3266] font-merriweather">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>AI natural language search of your stock</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Time-saving AI writing and content creation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Transparent analytics for customer search behaviour trends
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Search Engine Optimization tools to rank higher on Google
                </span>
              </li>
            </ul>
          </div>

          {/* Middle Column - Placeholder */}
          <div className="border-r border-gray-200 p-6 md:p-8">
            <div className="bg-[#1a3266] text-white px-4 py-3 mb-4">
              <h3 className="text-xl md:text-2xl font-bold font-merriweather">
                Competitive Pricing
              </h3>
            </div>
            <p className="text-sm md:text-base font-bold text-[#1a3266] font-merriweather mb-4 uppercase">
              A Boutique run business
            </p>
            <ul className="space-y-3 text-base md:text-lg text-[#1a3266] font-merriweather">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>AutoRo is a small enthusiast run business</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  We leverage AI to keep costs down and provide a high quality
                  service
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Run by technology and car specialists with 15+ years of
                  experience in the industry
                </span>
              </li>
              <li className="flex items-start"></li>
            </ul>
          </div>

          {/* Right Column - Placeholder */}
          <div className="p-6 md:p-8">
            <div className="bg-[#1a3266] text-white px-4 py-3 mb-4">
              <h3 className="text-xl md:text-2xl font-bold font-merriweather">
                Go live, fast
              </h3>
            </div>
            <p className="text-sm md:text-base font-bold text-[#1a3266] font-merriweather mb-4 uppercase">
              On time, and on budget
            </p>
            <ul className="space-y-3 text-base md:text-lg text-[#1a3266] font-merriweather">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Choose between a templated or custom design</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We leverage AI to keep costs down</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Custom integrations available across financial calculators,
                  CMS and social media integrations
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Connect a custom domain</span>
              </li>
              <li className="flex items-start"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
