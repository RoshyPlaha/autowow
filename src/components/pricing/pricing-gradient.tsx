import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface PricePoint {
  duration: string;
  price: number;
  isPopular?: boolean;
  isLimitedFree?: boolean;
}

const pricePoints: PricePoint[] = [
  { duration: "6 months", price: 0 },
  { duration: "1 year", price: 0, isLimitedFree: true },
  { duration: "2 years", price: 4.99, isPopular: true },
  { duration: "5 years", price: 8.99 },
];

interface PricingGradientProps {
  title?: string;
  subheading?: string;
  displaySelectedDuration?: boolean;
  onChange?: (duration: string) => void;
}

export const PricingGradient = ({
  title,
  subheading,
  displaySelectedDuration,
  onChange,
}: PricingGradientProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleValueChange = (value: number[]) => {
    setSelectedIndex(value[0]);
    if (onChange) {
      onChange(pricePoints[value[0]].duration);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 font-poppins">
      {title && (
        <div className="text-center">
          <h3 className="text-2xl font-bold font-merriweather">
            {title}
          </h3>
          <p className="text-white-600 mt-2">{subheading}</p>
        </div>
      )}

      {/* Slider Container */}
      <div className="py-8 mb-4">
        <div className="relative mx-auto">
          <Slider.Root
            className="relative flex items-center w-full h-5 select-none touch-none"
            value={[selectedIndex]}
            max={3}
            step={1}
            onValueChange={handleValueChange}
          >
            <Slider.Track className="bg-white relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 md:w-5 sm:h-5 bg-purple-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg" />
          </Slider.Root>

          {/* Price Point Markers */}
          {pricePoints.map((point, index) => (
            <div
              key={point.duration}
              className="absolute top-0 sm:mx-auto"
              style={{ left: `${(index / 3) * 100}%` }}
            >
              <div className="absolute mt-6 -ml-10 md:-ml-12 w-20 px-6 text-center Create an account or login so we can secure your capsule
">
                <p className="text-[12px] md:text-sm font-medium whitespace-nowrap">
                  {point.duration}
                </p>
                <p className="text-[10px] md:text-sm font-bold">
                  £{point.price.toFixed(2)}
                  <br className="md:hidden" />
                  {/* {point.isPopular && (
                    <span className="ml-1 text-[8px] md:text-xs text-purple-500">
                      Popular
                    </span>
                  )}
                  {point.isLimitedFree && (
                    <span className="ml-1 text-[8px] md:text-xs text-blue-500">
                      Limited Offer
                    </span>
                  )} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {displaySelectedDuration && (
        /* Selected Plan Display */
        <div className="relative mt-20 md:mt-32 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-medium">Selected Video Capsule</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {pricePoints[selectedIndex].duration} - £
              {pricePoints[selectedIndex].price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
