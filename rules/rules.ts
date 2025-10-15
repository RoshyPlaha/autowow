export const PROMPT_RULES = () => {
  return {
    rules: `
- If any information is not found, use null for optional fields
- Ensure year, engine_cc, mileage, and price are numbers (not strings)
- If the word 'truck' comes up ignore as this is not a model type
- the model should never be the same name for the make and model. if the model is the same name as the make, return an empty string for the model
- if no car make or model is mentioned explictly in the car_names_translation below, return an empty string for the make and model
- if you have a low confidence level on car make and model, return an empty string for the make and model

car_names_translation:
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


mileage rules:
- if the mileage is not mentioned, return an empty json object for the mileage
- if the mileage is mentioned as a max or 'no more than' or 'under' or 'up to' or similar language, return the mileagemax integer with value from the user input
- if the mileage is mentioned as a min or 'no less than' or similar language, return the mileagemin with the minmileage integer with value from the user input set`,
  };
};