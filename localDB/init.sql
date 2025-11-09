-- Database initialization script for AutoWow PostgreSQL database
-- This file will be automatically executed when the PostgreSQL container starts

-- Create the cars table with the specified structure
CREATE TABLE cars (
  id BIGSERIAL PRIMARY KEY,
  vin TEXT UNIQUE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  engine_cc INT,
  color TEXT,
  mileage INT, 
  price NUMERIC(12,2),
  is_ulez TEXT,
  seats INT,
  fuel_type TEXT,
  gearbox TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX ON cars (make, model);
CREATE INDEX ON cars (year);
CREATE INDEX ON cars (engine_cc);
CREATE INDEX ON cars (color);
CREATE INDEX ON cars (price);
CREATE INDEX ON cars (mileage);
CREATE INDEX ON cars (is_ulez);
CREATE INDEX ON cars (seats);
CREATE INDEX ON cars (fuel_type);
CREATE INDEX ON cars (gearbox);

-- Optional: Create a function to automatically update the created_at timestamp
CREATE OR REPLACE FUNCTION update_created_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Optional: Create trigger to automatically set created_at on insert
CREATE TRIGGER update_cars_created_at 
    BEFORE INSERT ON cars 
    FOR EACH ROW 
    EXECUTE FUNCTION update_created_at_column();

-- Seed the database with vehicle data from JSON
-- Check if cars table is empty before seeding
DO $$
DECLARE
    car_count INTEGER;
BEGIN
    -- Get count of existing cars
    SELECT COUNT(*) INTO car_count FROM cars;
    
    -- Only seed if table is empty
    IF car_count = 0 THEN
        -- Insert vehicles from JSON data
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price, is_ulez, seats, fuel_type, gearbox) VALUES ('76956096820444666', 'Aston Martin', 'DB11', 2017, 4.6, 'Silver', 51582, 443911, 'yes', 5, 'hybrid', 'automatic');
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price, is_ulez, seats, fuel_type, gearbox) VALUES ('43569636699382753', 'Bugatti', 'Chiron', 2011, 4.7, 'Blue', 122443, 112429, 'no', 4, 'diesel', 'automatic');
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price, is_ulez, seats, fuel_type, gearbox) VALUES ('61315621963985630', 'Lamborghini', 'Huracan', 2015, 5.8, 'Silver', 94358, 162349, 'no', 2, 'electric', 'manual');
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price, is_ulez, seats, fuel_type, gearbox) VALUES ('21043662563615187', 'Porsche', '911', 2018, 3.0, 'Gray', 105421, 123999, 'yes', 2, 'petrol', 'manual');
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price, is_ulez, seats, fuel_type, gearbox) VALUES ('58280856223044440', 'BMW', 'M3', 2017, 1671, 'Orange', 105629, 55847.63, 'yes', 5, 'petrol', 'manual');
        RAISE NOTICE 'Seeded database with % vehicles', 12;
    ELSE
        RAISE NOTICE 'Database already contains % vehicles, skipping seed', car_count;
    END IF;
END $$;
