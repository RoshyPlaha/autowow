import { generateText } from "ai";

import { createOpenAI } from "@ai-sdk/openai";
import { car_model } from "../models/car_model";

const openai = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const convertNLPToModel = async (
  message: string
): Promise<car_model> => {
  const structuredPrompt = `Extract car information from the following text and return ONLY a JSON object with the exact structure shown below. Do not include any other text, explanations, or formatting.

Text to analyze: "${message}"

Return ONLY this JSON structure with the extracted values:
{
  "make": "extracted car make",
  "model": "extracted car model",
  "year": extracted year as number,
  "engine_cc": extracted engine size in cc as number,
  "color": "extracted color",
  "mileage": extracted mileage as number,
  "price": extracted price as number
}

Rules:
- If car make is "mercedes" then return "Mercedes-Benz"
- If any information is not found, use null for optional fields
- Ensure year, engine_cc, mileage, and price are numbers (not strings)
- If the word 'truck' comes up ignore as this is not a model type
- the model should never be the same name of the make. if the model is the same name as the make, return an empty string for the model
`;


  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [
      {
        role: "user",
        content: structuredPrompt,
      },
    ],
  });

  // Parse the JSON response
  try {
    const parsed = JSON.parse(result.text);
    console.log("Parsed:", parsed);
    return parsed as car_model;
  } catch (error) {
    console.error("Failed to parse LLM response:", result.text);
    throw new Error("Invalid response from LLM");
  }
};
