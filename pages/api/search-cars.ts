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
    console.log("brandName", req.body.brandName);
    console.log("Request body:", req.body);

    const semtantic_car_model: SemanticCarModel = await extractSemanticModel(
      req.body.message
    );
    const rows = await carQueries.getByFilters(semtantic_car_model);

    if (rows.length === 0) {
      console.warn("no rows found for query: ", req.body.message);
      return res.status(204).json({ cars: [] });
    }

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
