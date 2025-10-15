import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { PROMPT_RULES } from "../rules/rules";
import { SemanticCarModel, SEMANTIC_CAR_SCHEMA_STRING } from "../models/semantic_model";

const openai = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const convertNLPToModel = async (  
  message: string
): Promise<SemanticCarModel> => {
  const structuredPrompt = `Extract car information from the following text and return ONLY a JSON object with the exact structure shown below. Do not include any other text, explanations, or formatting.

Text to analyze: "${message}"

Return ONLY this JSON structure with the extracted values:
${SEMANTIC_CAR_SCHEMA_STRING}

${PROMPT_RULES().rules}`;

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
    return parsed as SemanticCarModel;
  } catch (error) {
    console.error("Failed to parse LLM response:", result.text);
    throw new Error("Invalid response from LLM");
  }
};
