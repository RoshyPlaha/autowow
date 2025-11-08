-- Auto-generated SQL from vehicles.json
-- Generated on: Sat Nov  8 11:48:42 GMT 2025

-- Seed the database with vehicle data from JSON
DO $$
DECLARE
    car_count INTEGER;
BEGIN
    -- Get count of existing cars
    SELECT COUNT(*) INTO car_count FROM cars;
    
    -- Insert vehicles from JSON data
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('34318355812418737', 'Ferrari', '812 Superfast', 2021, 2665, 'Silver', 27547, 221926.84);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('75552495545379651', 'Mercedes-Benz', 'C-Class', 2016, 3964, 'Gray', 131874, 27503.82);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('46615673394553247', 'BMW', 'M3', 2010, 1671, 'Gray', 97941, 20914.71);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('61441697624360760', 'Chevrolet', 'Malibu', 2013, 1955, 'Gray', 78417, 10849.2);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('20559825414899396', 'Ford', 'F-150', 2012, 3729, 'Silver', 94389, 35983.38);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('69537977466112582', 'Ferrari', '812 Superfast', 2023, 1225, 'Orange', 81107, 497716.8);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('43722046020541427', 'Toyota', 'Corolla', 2011, 3686, 'Red', 88436, 19929.13);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('92337639819878635', 'Aston Martin', 'Vantage', 2019, 3687, 'Black', 47100, 318009.8);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('19929856237429810', 'Hyundai', 'Elantra', 2016, 6241, 'Silver', 17827, 27121.23);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('84376261020201380', 'McLaren', 'Artura', 2015, 5817, 'Orange', 66517, 417149.63);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('92995191450069013', 'Bugatti', 'Veyron', 2022, 2180, 'White', 105674, 229941.11);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('68644253674315089', 'Aston Martin', 'Vantage', 2019, 2555, 'Green', 20390, 112339.52);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('81169524377044726', 'Bentley', 'Bentayga', 2021, 2207, 'Silver', 16716, 233812.08);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('86279124475269138', 'Lamborghini', 'Huracan', 2010, 3736, 'Black', 121001, 198600.68);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('58024666084564339', 'Audi', 'Q5', 2017, 1601, 'Orange', 105629, 55847.63);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('37175171529006005', 'Audi', 'A6', 2024, 3042, 'Silver', 131234, 50702.44);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('47710905220917678', 'Bugatti', 'Veyron', 2024, 2042, 'Silver', 7715, 133986.63);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('56814039499239986', 'Bentley', 'Flying Spur', 2018, 6314, 'Green', 64879, 493466.89);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('60589769760558893', 'Bentley', 'Flying Spur', 2011, 1239, 'Black', 69883, 421552.19);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('25689236685169445', 'Bentley', 'Bentayga', 2017, 1667, 'Orange', 86286, 247559.83);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('27363772222620459', 'Chevrolet', 'Malibu', 2014, 1248, 'White', 35932, 50068.9);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('10103504986667006', 'Aston Martin', 'DBS Superleggera', 2011, 5835, 'Green', 36059, 483744.02);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('16352779143395388', 'Kia', 'Stinger', 2023, 4399, 'Yellow', 40524, 23672.44);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('55474712844264574', 'BMW', 'X5', 2022, 4766, 'Blue', 78526, 17774.79);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('78491813871876405', 'Toyota', 'RAV4', 2023, 5519, 'Orange', 37644, 52365.65);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('21962151702161019', 'Lamborghini', 'Aventador', 2022, 1605, 'Blue', 11803, 287753.33);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('22248298751476557', 'Ford', 'Escape', 2023, 5130, 'Gray', 52512, 51640.85);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('86828341735781439', 'Toyota', 'Prius', 2010, 6466, 'Orange', 50884, 48174.65);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('53321471132491206', 'Toyota', 'RAV4', 2010, 3983, 'Silver', 80486, 14852.98);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('29452083155683967', 'Aston Martin', 'Vantage', 2016, 1704, 'Green', 84813, 358647.03);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('92655218761003591', 'Kia', 'Sportage', 2014, 3131, 'Orange', 64675, 50581.26);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('70648545012957666', 'Audi', 'A6', 2021, 5729, 'Silver', 93932, 42274.21);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('73712531712343848', 'McLaren', '720S', 2011, 1114, 'Yellow', 67227, 105895.59);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('29185152357825753', 'Nissan', '370Z', 2019, 5140, 'Silver', 141085, 39669.64);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('75434303922171382', 'Ferrari', 'F8 Tributo', 2017, 2783, 'Gray', 128138, 293434.85);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('92591479418210847', 'Aston Martin', 'DBS Superleggera', 2022, 4874, 'Gray', 72873, 466021.82);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('57286944028025378', 'Ferrari', '812 Superfast', 2013, 3154, 'Gray', 18537, 469333.62);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('69869285320948202', 'Ferrari', '488 GTB', 2011, 3547, 'Yellow', 142385, 358920.8);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('69419120548239709', 'Porsche', 'Macan', 2022, 4367, 'Green', 18182, 214134.08);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('70130467826402709', 'Toyota', 'Camry', 2014, 2103, 'Red', 50496, 46620.83);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('28788415613432601', 'Chevrolet', 'Camaro', 2011, 2479, 'Silver', 22534, 51208.22);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('90117837112094585', 'Hyundai', 'Elantra', 2021, 2917, 'Black', 117173, 21696.84);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('83302693749642374', 'BMW', '530i', 2014, 1778, 'White', 37226, 40977.96);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('45801498402954934', 'Bugatti', 'Chiron', 2021, 3680, 'Yellow', 16389, 244205.72);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('71716510563766302', 'Aston Martin', 'DBS Superleggera', 2011, 4766, 'Yellow', 97007, 407435.35);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('90710021803864733', 'Kia', 'Sportage', 2020, 6211, 'Blue', 116591, 55721.82);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('73479383111869537', 'Hyundai', 'Sonata', 2019, 5584, 'Yellow', 42175, 31346.62);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('40039708044491898', 'Aston Martin', 'Vantage', 2024, 1347, 'Green', 95600, 245788.41);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('77738671337583765', 'Ferrari', '812 Superfast', 2017, 3140, 'White', 115183, 147365.53);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('36070347785740991', 'Chevrolet', 'Camaro', 2014, 3584, 'Green', 100120, 39718.51);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('23636861766560579', 'Bentley', 'Continental GT', 2013, 6184, 'Silver', 54631, 130053.68);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('58053586407096790', 'Honda', 'Civic', 2015, 2359, 'Silver', 144881, 28695.02);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('86978337071265771', 'Lamborghini', 'Urus', 2015, 3910, 'Red', 34907, 402702.19);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('13032477389746407', 'Bentley', 'Continental GT', 2012, 5669, 'Red', 88614, 245785.6);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('73500290507085425', 'Aston Martin', 'Vantage', 2021, 2009, 'Blue', 91985, 115969.04);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('94660524970234799', 'Ferrari', 'F8 Tributo', 2019, 1352, 'Yellow', 75226, 442720.75);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('97920411201732632', 'Toyota', 'Prius', 2023, 1332, 'White', 103485, 43901.63);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('19732660459006962', 'Porsche', 'Panamera', 2019, 2439, 'Black', 26698, 209140.4);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('40295887407022437', 'McLaren', '720S', 2018, 1900, 'Black', 63152, 114016.74);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('60036365192920098', 'Mercedes-Benz', 'C-Class', 2015, 4812, 'Green', 99387, 43365.18);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('94628251512883940', 'Mercedes-Benz', 'S-Class', 2018, 2615, 'Silver', 57694, 32482.74);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('11089608395452405', 'Kia', 'Stinger', 2017, 5038, 'Silver', 94050, 48298.09);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('41806110422025078', 'Lamborghini', 'Huracan', 2013, 1700, 'Blue', 31614, 371131.36);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('18576250844819031', 'Hyundai', 'Tucson', 2022, 5514, 'Blue', 29231, 10538.34);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('92717334621232100', 'Nissan', 'Rogue', 2015, 6155, 'Silver', 29154, 16866.97);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('87982180370850484', 'Ford', 'Escape', 2012, 5440, 'Black', 66287, 29005.73);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('71733358541827016', 'Lamborghini', 'Huracan', 2016, 5701, 'Orange', 38128, 257331.93);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('23604779482613118', 'Audi', 'Q5', 2010, 5234, 'Blue', 104868, 50870.53);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('63764007467748174', 'Honda', 'Civic', 2018, 5142, 'Black', 39333, 34114.9);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('18642592669014704', 'Toyota', 'Camry', 2022, 2169, 'Black', 70288, 13205.26);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('89164031209852034', 'Kia', 'Sorento', 2013, 5013, 'Blue', 28794, 30929.58);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('65129629710511044', 'Aston Martin', 'DB11', 2014, 1873, 'Blue', 98756, 195952.81);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('54632084104243154', 'Bentley', 'Continental GT', 2019, 2690, 'Gray', 125566, 294970.48);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('48587627269254187', 'Aston Martin', 'DB11', 2011, 3045, 'Red', 61908, 231654.9);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('15200716924812743', 'McLaren', 'Artura', 2012, 5833, 'Blue', 105525, 169637.31);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('37255714841751914', 'McLaren', 'Artura', 2015, 1934, 'White', 30259, 172641.74);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('46615771529743474', 'Audi', 'Q5', 2022, 4269, 'Green', 109407, 57584.73);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('71251199791425120', 'Toyota', 'Camry', 2013, 6437, 'Black', 145877, 22357.64);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('60683405695798631', 'Mercedes-Benz', 'GLA', 2016, 3626, 'Silver', 93756, 59502.5);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('52291892609733128', 'Lamborghini', 'Aventador', 2023, 4991, 'Yellow', 14640, 436149.37);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('82496774619715095', 'Ferrari', '812 Superfast', 2020, 4175, 'Red', 89570, 131647.69);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('35194291692893713', 'Bentley', 'Bentayga', 2015, 3317, 'Red', 94701, 194624.89);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('50986105775185632', 'Nissan', 'Sentra', 2017, 1657, 'Yellow', 120070, 21245.0);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('41291737261146209', 'Toyota', 'Camry', 2021, 4753, 'Green', 20917, 55469.59);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('84428805705373804', 'BMW', 'X5', 2014, 3031, 'Red', 89885, 56236.12);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('58344176564568983', 'Hyundai', 'Tucson', 2018, 3835, 'Yellow', 54232, 20636.76);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('11404686158537897', 'Bentley', 'Bentayga', 2011, 5855, 'White', 147165, 215530.62);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('96265804774377224', 'Porsche', '911 Carrera', 2022, 6045, 'Silver', 77960, 107937.58);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('95715024925403949', 'Aston Martin', 'Vantage', 2015, 4211, 'Green', 41483, 319691.23);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('65269250089484098', 'Audi', 'Q5', 2016, 5549, 'White', 146333, 32696.56);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('86563858878188600', 'Audi', 'S4', 2013, 2401, 'Green', 54458, 48110.02);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('68604628052930474', 'BMW', '530i', 2010, 2363, 'Black', 77485, 51937.08);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('54689177086145300', 'McLaren', '720S', 2012, 3447, 'White', 116550, 409076.52);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('49746513176900592', 'Chevrolet', 'Camaro', 2023, 3583, 'Green', 54281, 23144.29);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('83834046797623045', 'Lamborghini', 'Urus', 2012, 2892, 'Silver', 133073, 123293.54);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('61718576238120581', 'Bugatti', 'Chiron', 2011, 5992, 'Blue', 67474, 244169.61);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('40644250172593371', 'Hyundai', 'Kona', 2015, 3989, 'Green', 109860, 25939.73);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('53683083799319823', 'Lamborghini', 'Urus', 2020, 1844, 'Blue', 12786, 204858.08);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('34327883486087127', 'Lamborghini', 'Huracan', 2010, 3123, 'White', 65949, 476776.36);
    INSERT INTO cars (vin, make, model, year, engine_cc, color, mileage, price) VALUES ('89021488174819221', 'Toyota', 'Corolla', 2024, 4515, 'Gray', 20444, 30961.04);
    RAISE NOTICE 'Successfully seeded database with vehicles from JSON data';

END $$;
