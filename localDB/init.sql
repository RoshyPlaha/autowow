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
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX ON cars (make, model);
CREATE INDEX ON cars (year);
CREATE INDEX ON cars (engine_cc);
CREATE INDEX ON cars (color);
CREATE INDEX ON cars (price);
CREATE INDEX ON cars (mileage);

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
        -- Insert sample vehicles
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES
        ('1HGBH41JXMN109186', 'Honda', 'Civic', 2021, 1500, 'Silver', 25000, 22000.00),
        ('1FTFW1ET5DFC12345', 'Ford', 'F-150', 2020, 3500, 'Blue', 45000, 35000.00),
        ('WBAFR9C5XDC123456', 'BMW', '3 Series', 2019, 2000, 'Black', 38000, 28000.00),
        ('1N4AL3AP8EC123789', 'Nissan', 'Altima', 2022, 2500, 'White', 15000, 26000.00),
        ('1J4RR4GG2BC123456', 'Jeep', 'Grand Cherokee', 2021, 3600, 'Red', 32000, 42000.00),
        ('5NPE34AF4HH123456', 'Hyundai', 'Elantra', 2020, 2000, 'Gray', 28000, 18000.00),
        ('1FMCU9HD6KUA12345', 'Ford', 'Explorer', 2019, 3000, 'Black', 55000, 29000.00),
        ('2HGFC2F59MH123456', 'Honda', 'Accord', 2021, 1800, 'White', 22000, 24000.00),
        ('1G1ZD5ST6JF123456', 'Chevrolet', 'Malibu', 2018, 1600, 'Silver', 67000, 16000.00),
        ('KMHD35LH3HU123456', 'Kia', 'Sorento', 2017, 2700, 'Blue', 78000, 19000.00),
        ('1HGCM82633A123456', 'Honda', 'CR-V', 2023, 1900, 'Black', 5000, 32000.00),
        ('1FTEW1CP5JFA12345', 'Ford', 'Mustang', 2018, 5000, 'Red', 45000, 35000.00);
        
        RAISE NOTICE 'Seeded database with % vehicles', 12;
    ELSE
        RAISE NOTICE 'Database already contains % vehicles, skipping seed', car_count;
    END IF;
END $$;
