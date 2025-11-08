import { SemanticCarModel } from "../models/semantic_model";
import { extractColors } from "./specialized-extractors";
// import { extractMakeModel } from "./specialized-extractors";
import { extractMileage } from "./specialized-extractors";
import { extractPrice } from "./specialized-extractors";
import { extractYear } from "./specialized-extractors";
import { getPromptRules } from "../rules/rule-orchestrator";

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

  const colors = await extractColors(
    message,
    getPromptRules({
      includeCore: false,
      includeMileage: false,
      includePricing: false,
      includeColor: true,
      includeYear: false,
    })
  );

  const mileage = await extractMileage(
    message,
    getPromptRules({
      includeCore: false,
      includeMileage: true,
      includePricing: false,
      includeColor: false,
      includeYear: false,
    })
  );

  const price = await extractPrice(
    message,
    getPromptRules({
      includeCore: false,
      includeMileage: false,
      includePricing: true,
      includeColor: false,
      includeYear: false,
    })
  );

  const year = await extractYear(
    message,
    getPromptRules({
      includeCore: false,
      includeMileage: false,
      includePricing: false,
      includeColor: false,
      includeYear: true,
    })
  );

  // const makeModel = ""; //await extractMakeModel(message);

  console.log("Extraction results:", { colors });

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
  };

  console.log("Combined semantic model:", semanticModel);
  return semanticModel;
};
