export const FUEL_TYPE_RULES = `
Fueltype extraction rules:
- If fueltype is not mentioned, return null for fueltype
- If fueltype is mentioned, return the fueltype string from the user input
- Common fueltype expressions to recognize:
  * 'petrol' -> fueltype: 'petrol'
  * 'diesel' -> fueltype: 'diesel'
  * 'electric' -> fueltype: 'electric'
  * 'hybrid' -> fueltype: 'hybrid'
  * 'plug-in hybrid' -> fueltype: 'hybrid'
  * 'battery electric' -> fueltype: 'electric'

If the fueltype is not mentioned, return null for fueltype. If manual or automatic is mentioned, return the fueltype null.
`;