import { car } from "models/car_model";
import Image from "next/image";
import TransitionLink from "../page-animation/transition-link";

const formatPrice = (price: number | undefined): string => {
  if (!price) return "";
  return Math.round(price).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  });
};

const formatYear = (year: number | undefined): string => {
  if (!year) return "";
  const lastTwoDigits = year.toString().slice(-2);
  return `${year} (${lastTwoDigits})`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatMileage = (mileage: any): string => {
  if (!mileage) return "0";
  // Handle mileage object or number
  if (typeof mileage === "object" && mileage.value) {
    return mileage.value.toLocaleString("en-GB");
  }
  if (typeof mileage === "number") {
    return mileage.toLocaleString("en-GB");
  }
  return "0";
};

export const TableStockDisplay = ({
  carResults,
  brandName,
  primaryColor,
}: {
  carResults: car[];
  brandName: string;
  primaryColor: string;
}) => {
  return (
    <>
      {carResults.length > 0 && (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carResults.map((car: car) => (
              <div
                key={car.id}
                className="bg-white flex flex-col"
              >
                {/* Car Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                  <Image
                    src="/assets/car_default_3.png"
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Car Details */}
                <div className="flex flex-col flex-1">
                  {/* Model Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase font-merriweather">
                    {car.make} {car.model}
                  </h3>

                  {/* Specifications */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 font-medium">YEAR:</span>
                      <span className="text-sm text-black font-semibold">
                        {formatYear(car.year)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 font-medium">PRICE:</span>
                      <span className="text-sm text-black font-semibold">
                        {car.price ? `£${formatPrice(car.price)}` : "UNDER OFFER"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 font-medium">COLOUR:</span>
                      <span className="text-sm text-black font-semibold">
                        {Array.isArray(car.color)
                          ? car.color.join(", ")
                          : car.color || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-sm text-gray-600 font-medium">MILEAGE:</span>
                      <span className="text-sm text-black font-semibold">
                        {formatMileage(car.mileage)}
                      </span>
                    </div>
                  </div>

                  {/* View Vehicle Button */}
                  <TransitionLink
                    href={`/demo/car_detail?id=${car.id}&brandName=${encodeURIComponent(brandName)}&primaryColor=${encodeURIComponent(primaryColor)}`}
                    className="mt-auto"
                  >
                    <button className="w-full bg-black text-white px-6 py-3 font-semibold hover:bg-gray-500 transition-colors">
                      VIEW VEHICLE
                    </button>
                  </TransitionLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
