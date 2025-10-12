-- Auto-generated SQL from vehicles.json
-- Generated on: Sun Oct  5 22:25:42 BST 2025

-- Seed the database with vehicle data from JSON
DO $$
DECLARE
    car_count INTEGER;
BEGIN
    -- Get count of existing cars
    SELECT COUNT(*) INTO car_count FROM cars;
    
    -- Only seed if table is empty
    IF car_count = 0 THEN
        -- Insert vehicles from JSON data
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1HGBH41JXMN109186', 'Honda', 'Civic', 2021, 1500, 'Silver', 25000, 22000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1FTFW1ET5DFC12345', 'Ford', 'F-150', 2020, 3500, 'Blue', 45000, 35000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('WBAFR9C5XDC123456', 'BMW', '3 Series', 2019, 2000, 'Black', 38000, 28000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1N4AL3AP8EC123789', 'Nissan', 'Altima', 2022, 2500, 'White', 15000, 26000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1J4RR4GG2BC123456', 'Jeep', 'Grand Cherokee', 2021, 3600, 'Red', 32000, 42000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('5NPE34AF4HH123456', 'Hyundai', 'Elantra', 2020, 2000, 'Gray', 28000, 18000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1FMCU9HD6KUA12345', 'Ford', 'Explorer', 2019, 3000, 'Black', 55000, 29000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('2HGFC2F59MH123456', 'Honda', 'Accord', 2021, 1800, 'White', 22000, 24000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1G1ZD5ST6JF123456', 'Chevrolet', 'Malibu', 2018, 1600, 'Silver', 67000, 16000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('KMHD35LH3HU123456', 'Kia', 'Sorento', 2017, 2700, 'Blue', 78000, 19000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1HGCM82633A123456', 'Honda', 'CR-V', 2023, 1900, 'Black', 5000, 32000.00);
        INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('1FTEW1CP5JFA12345', 'Ford', 'Mustang', 2018, 5000, 'Red', 45000, 35000.00);

        RAISE NOTICE 'Successfully seeded database with vehicles from JSON data';
    ELSE
        RAISE NOTICE 'Database already contains % vehicles, skipping seed', car_count;
    END IF;
END $$;
