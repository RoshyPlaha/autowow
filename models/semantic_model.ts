// Type definition for the semantic car model
export interface SemanticCarModel {
  make: string;
  model: string;
  year: number;
  engine_cc?: number;
  color?: string[];
  mileagemin?: number;
  maxMileage?: number;
  price?: number;
}

// JSON schema template for LLM prompts
export const SEMANTIC_CAR_SCHEMA = {
  make: "extracted car make",
  model: "extracted car model",
  year: "extracted year as number",
  engine_cc: "extracted engine size in cc as number (optional)",
  color: "Return an array of colors (optional)",
  mileagemin: "extracted min mileage as number (optional)",
  mileagemax: "extracted max mileage as number (optional)",
  price: "extracted price as number (optional)",
} as const;

// String representation for prompt injection - so think of this as more of utility function..
export const SEMANTIC_CAR_SCHEMA_STRING = JSON.stringify(
  {
    ...SEMANTIC_CAR_SCHEMA,
  },
  null,
  2
);
