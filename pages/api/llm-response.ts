import { createOpenAI } from "@ai-sdk/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { generateText } from "ai";
import { scrapeAutoTrader } from "../../shared_objects/scrape";

type ResponseData = {
  message: string;
};

interface CarExtraction {
  make: string;
  model: string;
  colour: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { message } = req.body;

  const openai = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  // Create a structured prompt that forces JSON output
  const structuredPrompt = `Extract car information from the following text and return ONLY a JSON object with the exact structure shown below. Do not include any other text, explanations, or formatting.

Text to analyze: "${message}"

Return ONLY this JSON structure with the extracted values:
{
  "make": "extracted car make",
  "model": "extracted car model", 
  "colour": "extracted car colour"
}

if car is "mercedes" then return "Mercedes-Benz"

If any information is not found, use empty string "".`;

  const result = await generateText({
    model: openai("llama-3.1-8b-instant"),
    messages: [
      {
        role: "user",
        content: structuredPrompt,
      },
    ],
  });

  // Try to parse the response as JSON
  let carInfo: CarExtraction;
  try {
    carInfo = JSON.parse(result.text);
  } catch (error) {
    console.error(`Failed to parse JSON response: ${result.text}. Got error: ${error}`);
    carInfo = { make: "", model: "", colour: "" };
  }

  // Use the extracted car info for scraping
  console.log("Car info:", carInfo);
  const scrapedData = await scrapeAutoTrader(carInfo.make, carInfo.model);

  return res.status(200).json({ 
    message: `Extracted: ${JSON.stringify(carInfo)}, Scraped: ${JSON.stringify(scrapedData[0])}` 
  });
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
