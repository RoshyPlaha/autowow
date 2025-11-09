// Type definition for the semantic car model
export interface SemanticCarModel {
  make: string;
  model: string;
  minYear?: number;
  maxYear?: number;
  engine_cc?: number;
  color?: string[] | null;
  mileagemin?: number;
  mileagemax?: number;
  minPrice?: number;
  maxPrice?: number;
  gearbox?: string;
  fuelType?: string;
}