export interface car {
  id?: number;
  vin?: string;
  make: string;
  model: string;
  year: number;
  engine_cc?: number;
  color?: string[];
  mileage: {}
  price?: number;
  created_at?: Date;
}
