import { NextApiRequest, NextApiResponse } from "next";
import { car } from "models/car_model";
import { SemanticCarModel } from "models/semantic_model";
import { carQueries } from "../../utils/postgres";
import { extractSemanticModel } from "service/semantic-extractor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ cars: car[] }>
) {
  try {
    console.log("Request body:", req.body);
    
    const semtantic_car_model: SemanticCarModel = await extractSemanticModel(req.body.message);
    const rows = await carQueries.getByFilters(semtantic_car_model);

    console.log("rows", rows[0]);
    return res.status(200).json({ cars: rows || [] });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ cars: [] });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
