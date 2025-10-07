export interface car_model {
  id?: number;
  vin?: string;
  make: string;
  model: string;
  year: number;
  engine_cc?: number;
  color?: string;
  mileage?: number;
  price?: number;
  created_at?: Date;
}
