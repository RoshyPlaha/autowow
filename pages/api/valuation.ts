import type { NextApiRequest, NextApiResponse } from "next";

type ValuationResponse = {
  estimatedValue: string;
  message?: string;
  registration?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValuationResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { registration } = req.body;

  if (!registration || typeof registration !== "string") {
    return res.status(400).json({ error: "Registration is required" });
  }

  // Mock valuation logic - replace with actual valuation service later
  const mockValuations: Record<string, string> = {
    AB12CDE: "£15,500",
    XY99ABC: "£8,200",
    LM55XYZ: "£22,300",
  };

  // Generate a mock value based on registration or use a default
  const estimatedValue =
    mockValuations[registration.toUpperCase()] ||
    `£${Math.floor(Math.random() * 20000 + 5000).toLocaleString()}`;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return res.status(200).json({
    estimatedValue,
    message: "Based on similar vehicles in your area",
    registration: registration.toUpperCase(),
  });
}

