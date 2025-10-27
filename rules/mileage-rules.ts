export const MILEAGE_RULES = `
Mileage extraction rules:
- If the mileage is not mentioned, return null for mileagemin and mileagemax
- If the mileage is mentioned as a maximum or 'less than' or 'no more than' or 'under' or 'up to' or 'below', return the mileagemax integer with value from the user input
- If the mileage is mentioned as a minimum or 'more than' or 'no less than' or 'over' or 'above' or 'at least', return the mileagemin integer with value from the user input
- If a range is mentioned (e.g., 'between 20k and 50k miles'), set both mileagemin and mileagemax
- If exact mileage is mentioned (e.g., '30k miles'), set mileagemax to that value and mileagemin to null
- Common mileage expressions to recognize:
  * 'under 50k' -> mileagemax: 50000 (ONLY mileagemax)
  * 'less than 55,000 miles' -> mileagemax: 55000 (ONLY mileagemax)
  * 'no more than 50k miles' -> mileagemax: 50000 (ONLY mileagemax)
  * 'over 100k' -> mileagemin: 100000 (ONLY mileagemin)
  * 'more than 100k miles' -> mileagemin: 100000 (ONLY mileagemin)
  * 'at least 50k' -> mileagemin: 50000 (ONLY mileagemin)
  * 'between 20k-40k' -> mileagemin: 20000, mileagemax: 40000
  * 'around 30k' -> mileagemax: 35000 (give some buffer)
  * 'high mileage' -> mileagemin: 100000
  * 'low mileage' -> mileagemax: 50000
`;
