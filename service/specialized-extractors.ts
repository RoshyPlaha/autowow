import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const extractLLMResponse = async (prompt: string) => {
  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [{ role: "user", content: prompt }],
  });
  return result;
};

// Extract only color information
export const extractColors = async (
  message: string,
  rules: string
): Promise<string[] | null> => {
  const prompt = `You are a JSON-only response system. Extract ONLY car colors from the text in the format {"colors": []}.

Text to analyze: "${message}"

Rules:
${rules}

Return ONLY an array of colors like: ["blue", "red"] or null

If colors are found, return a JSON array: ["blue", "red"]
If no colors are found, return: []

Examples:
- "blue car" → ["blue"]
- "red or white car" → ["red", "white"] 
- "BMW car" → []
- "blue and silver BMW" → ["blue", "silver"]

Your response must be ONLY the JSON array:`;

  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const parsed = JSON.parse(result.text);
    console.log("the colors result is: ", parsed);
    return Array.isArray(parsed.colors) ? parsed.colors : null;
  } catch (error) {
    console.error("Failed to parse color extraction:", result.text);
    return null;
  }
};

// Extract only mileage information
export const extractMileage = async (
  message: string,
  rules: string
): Promise<{ mileagemin?: number; mileagemax?: number } | null> => {
  const prompt = `You are a JSON-only response system. Extract ONLY car mileage from the text in the format {"mileagemin": x, "mileagemax": x} where x will be replaced based on the rules provided.

Text: "${message}"

Rules:
${rules}

Do not extract any other information - only mileage.`;

  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const parsed = JSON.parse(result.text);
    console.log("the mileage result is: ", parsed);
    return parsed && (parsed.mileagemin || parsed.mileagemax) ? parsed : null;
  } catch (error) {
    console.error("Failed to parse mileage extraction:", result.text);
    return null;
  }
};

// Extract only price information
export const extractPrice = async (
  message: string,
  rules: string
): Promise<{ minPrice?: number; maxPrice?: number } | null> => {
  const prompt = `You are a JSON-only response system. Extract ONLY car prices from the text in the format {"minPrice": x, "maxPrice": x} where x will be replaced based on the rules provided.

Text: "${message}"

CRITICAL: Do NOT extract any values that mention "miles", "mileage", "km", or any distance units. These are NOT prices.

Rules:
${rules}

Do not extract any other information - only price.`;

  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const parsed = JSON.parse(result.text);
    console.log("the price result is: ", parsed);
    return parsed && (parsed.minPrice || parsed.maxPrice) ? parsed : null;
  } catch (error) {
    console.error("Failed to parse price extraction:", result.text);
    return null;
  }
};

// Extract only year information
export const extractYear = async (
  message: string,
  rules: string
): Promise<{ minYear?: number; maxYear?: number } | null> => {
  const prompt = `You are a JSON-only response system. Extract ONLY years from the text in the format {"minYear": x, "maxYear": x} where x will be replaced based on the rules provided.

Text: "${message}"

Return ONLY a JSON object like: {"minYear": 2020, "maxYear": 2025} or null

Rules:
${rules}

Do not extract any other information - only year.`;

  const result = await extractLLMResponse(prompt);

  try {
    const parsed = JSON.parse(result.text);
    console.log("the year result is: ", parsed);
    return parsed && (parsed.minYear || parsed.maxYear) ? parsed : null;
  } catch (error) {
    console.error("Failed to parse year extraction:", result.text);
    return null;
  }
};

// Extract only make/model information
export const extractMakeModel = async (
  message: string,
  rules: string
): Promise<{ make: string; model: string } | null> => {
  return null;
};
