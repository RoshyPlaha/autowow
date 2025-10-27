export const CORE_RULES = `
- If any information is not found, use null for optional fields
- Ensure year, engine_cc, mileage, and price are numbers (not strings)
- If the word 'truck' comes up ignore as this is not a model type
- The model should never be the same name as the make. If the model is the same name as the make, return an empty string for the model
- If no car make or model is mentioned explicitly in the car_names_translation below, return an empty string for the make and model
- If you have a low confidence level on car make and model, return an empty string for the make and model
- Do not assume the make of a car

Car names translation:
- mercedes -> mercedes-benz
- bmw -> bmw
- audi -> audi
- volvo -> volvo
- volkswagen -> volkswagen
- peugeot -> peugeot
- renault -> renault
- citroen -> citroen
- fiat -> fiat
- skoda -> skoda
- land rover -> land rover
- jeep -> jeep
- toyota -> toyota
- honda -> honda
- nissan -> nissan
- hyundai -> hyundai
- kia -> kia
- mazda -> mazda
`;
