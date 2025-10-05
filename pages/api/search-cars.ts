import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  cars: Car[];
};

interface RequestBody {
  recipientEmail: string;
  filename: string;
}

import { carQueries } from "../../utils/postgres";
import { Car } from "models/car";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const rows = await carQueries.getAll();
    console.log("Rows:", rows);

    return res.status(200).json({ cars: rows });
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
