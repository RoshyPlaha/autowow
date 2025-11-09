import { SemanticCarModel } from "../models/semantic_model";
import { extractColors } from "./specialized-extractors";
// import { extractMakeModel } from "./specialized-extractors";
import { extractMileage } from "./specialized-extractors";
import { extractPrice } from "./specialized-extractors";
import { extractYear } from "./specialized-extractors";
import { extractGearbox } from "./specialized-extractors";
import { extractFuelType } from "./specialized-extractors";
import {
  getSpecificRule,
  INCLUDE_COLOR,
  INCLUDE_MILEAGE,
  INCLUDE_PRICING,
  INCLUDE_YEAR,
  INCLUDE_GEARBOX,
  INCLUDE_FUEL_TYPE,
} from "../rules/rule-orchestrator";

export const extractSemanticModel = async (
  message: string
): Promise<SemanticCarModel> => {
  console.log("Starting specialized extraction for:", message);

  //   Run all extractions in parallel for better performance. TODO: Implement this
  //   const [colors, makeModel, mileage, price, year] = await Promise.all([
  //     extractMakeModel(message, ""),
  //     extractColors(message, getSpecificRule(INCLUDE_COLOR)),
  //     extractMileage(message, getSpecificRule(INCLUDE_MILEAGE)),
  //     extractPrice(message, getSpecificRule(INCLUDE_PRICING)),
  //     extractYear(message, getSpecificRule(INCLUDE_YEAR)),
  //   ]);

  const colors = await extractColors(message, getSpecificRule(INCLUDE_COLOR));
  const mileage = await extractMileage(
    message,
    getSpecificRule(INCLUDE_MILEAGE)
  );
  const price = await extractPrice(message, getSpecificRule(INCLUDE_PRICING));
  const year = await extractYear(message, getSpecificRule(INCLUDE_YEAR));
  const gearbox = await extractGearbox(
    message,
    getSpecificRule(INCLUDE_GEARBOX)
  );
  const fuelType = await extractFuelType(
    message,
    getSpecificRule(INCLUDE_FUEL_TYPE)
  );
  // const makeModel = ""; //await extractMakeModel(message);

  console.log("Extraction results:", { gearbox, fuelType });

  // Combine all results into a single semantic model
  const semanticModel: SemanticCarModel = {
    make: "", // makeModel?.make |
    model: "", // makeModel?.model |
    minYear: year?.minYear,
    maxYear: year?.maxYear,
    engine_cc: undefined, // Not extracted in specialized extractors
    color: colors,
    mileagemin: mileage?.mileagemin,
    mileagemax: mileage?.mileagemax,
    minPrice: price?.minPrice,
    maxPrice: price?.maxPrice,
    gearbox: gearbox?.gearbox,
    fuelType: fuelType?.fuelType,
  };

  console.log("Combined semantic model:", semanticModel);
  return semanticModel;
};
