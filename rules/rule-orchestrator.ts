import { CORE_RULES } from "./core-rules";
import { MILEAGE_RULES } from "./mileage-rules";
import { PRICING_RULES } from "./pricing-rules";
import { COLOR_RULES } from "./color-rules";
import { YEAR_RULES } from "./year-rules";
import { GEARBOX_RULES } from "./gearbox-rules";
import { FUEL_TYPE_RULES } from "./fueltype-rules";

export const INCLUDE_MILEAGE: string = "INCLUDE_MILEAGE";
export const INCLUDE_PRICING: string = "INCLUDE_PRICING";
export const INCLUDE_COLOR: string = "INCLUDE_COLOR";
export const INCLUDE_YEAR: string = "INCLUDE_YEAR";
export const INCLUDE_CORE: string = "INCLUDE_CORE";
export const INCLUDE_GEARBOX: string = "INCLUDE_GEARBOX";
export const INCLUDE_FUEL_TYPE: string = "INCLUDE_FUEL_TYPE";

export interface RuleConfig {
  includeCore: boolean;
  includeMileage: boolean;
  includePricing: boolean;
  includeColor: boolean;
  includeYear: boolean;
}

export const getPromptRules = (
  config: RuleConfig = {
    includeCore: true,
    includeMileage: true,
    includePricing: true,
    includeColor: true,
    includeYear: false,
  }
) => {
  const rules: string[] = [];

  if (config.includeCore) rules.push(CORE_RULES);
  if (config.includeMileage) rules.push(MILEAGE_RULES);
  if (config.includePricing) rules.push(PRICING_RULES);
  if (config.includeColor) rules.push(COLOR_RULES);
  if (config.includeYear) rules.push(YEAR_RULES);

  return rules.join("\n\n");
};

export const getSpecificRule = (rule: string): string => {
  switch (rule) {
    case INCLUDE_MILEAGE:
      return MILEAGE_RULES;
    case INCLUDE_PRICING:
      return PRICING_RULES;
    case INCLUDE_COLOR:
      return COLOR_RULES;
    case INCLUDE_YEAR:
      return YEAR_RULES;
    case INCLUDE_CORE:
      return CORE_RULES;
    case INCLUDE_GEARBOX:
      return GEARBOX_RULES;
    case INCLUDE_FUEL_TYPE:
      return FUEL_TYPE_RULES;
    default:
      return "";
  }
};
