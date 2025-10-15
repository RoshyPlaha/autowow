import { NextApiRequest, NextApiResponse } from "next";
import { car } from "models/car_model";
import { SemanticCarModel } from "models/semantic_model";
import { carQueries } from "../../utils/postgres";
import { convertNLPToModel } from "service/nlp_to_model";

type ResponseData = {
  cars: car[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log("Request body:", req.body);

    const semtantic_car_model: SemanticCarModel = await convertNLPToModel(
      req.body.message
    );
  
    console.log("Semtantic car model:", semtantic_car_model);

    const rows = await carQueries.getByFilters(semtantic_car_model);

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
