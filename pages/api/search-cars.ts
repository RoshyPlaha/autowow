import { NextApiRequest, NextApiResponse } from "next";
import { car_model } from "models/car_model";

type ResponseData = {
  cars: car_model[];
};


import { carQueries } from "../../utils/postgres";
import { convertNLPToModel } from "service/nlp_to_model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {

    console.log("Request body:", req.body);

    const car_model = await convertNLPToModel(req.body.message);

    const rows = await carQueries.getByFilters(car_model);

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
