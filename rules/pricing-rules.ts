export const PRICING_RULES = `
Price extraction rules:
- If price is not mentioned, return null for minPrice and maxPrice
- CRITICAL: If any numeric value is followed by "miles", "mileage", "km", "kilometers", or any distance unit - DO NOT use that value for price
- CRITICAL: Examples of what NOT to extract as price:
  * "45000 miles" -> NOT a price, this is mileage
  * "30k miles" -> NOT a price, this is mileage  
  * "under 50k miles" -> NOT a price, this is mileage
  * "high mileage" -> NOT a price, this is mileage
- Only extract values that are clearly prices with currency symbols (£, $, €) or price-related words
- If price is mentioned as a max or 'under' or 'no more than' or similar language, return the maxPrice integer with value from the user input
- If price is mentioned as a min or 'over' or 'no less than' or similar language, return the minPrice with the minimum price integer with value from the user input set
- If a range is mentioned (e.g., 'between £20k and £50k'), set both minPrice and maxPrice
- If exact price is mentioned (e.g., '£30k'), set maxPrice to that value and minPrice to null
- If "does not cost more than" or "no more than" or "maximum" is mentioned, set ONLY maxPrice
- If "costs at least" or "minimum" or "starting from" is mentioned, set ONLY minPrice
- Common price expressions to recognize:
  * 'under £30k' -> maxPrice: 30000
  * 'under 30,000 pounds' -> maxPrice: 30000
  * 'does not cost more than 50,000 pounds' -> maxPrice: 50000 (ONLY maxPrice)
  * 'no more than £50k' -> maxPrice: 50000 (ONLY maxPrice)
  * 'maximum £50k' -> maxPrice: 50000 (ONLY maxPrice)
  * 'over £50k' -> minPrice: 50000 (ONLY minPrice)
  * 'at least £50k' -> minPrice: 50000 (ONLY minPrice)
  * 'minimum £50k' -> minPrice: 50000 (ONLY minPrice)
  * 'between £20k-£40k' -> minPrice: 20000, maxPrice: 40000
  * 'around £25k' -> maxPrice: 27500 (give some buffer)
  * 'budget friendly' -> maxPrice: 25000
  * 'luxury' -> minPrice: 50000
- Currency conversions: £ = pounds, $ = dollars, € = euros
- Price indicators: "price", "cost", "budget", "affordable", "expensive", "cheap"
- NEVER extract mileage values as prices, even if they contain numbers
`;
