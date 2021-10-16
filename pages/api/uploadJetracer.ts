import type { NextApiRequest, NextApiResponse } from "next";
import { dbConn } from "../../src/utils";

const dbClient = dbConn();

type Data = {
  ip?: string;
  mac?: string;
  file?: any;
  error?: string;
};

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbClient.connect();

  const isTypeNull = req.query.type == null ? true : false;
  const isDateNull = req.query.date == null ? true : false;
  const isImageURLNull = req.query.url == null ? true : false;

  if (isTypeNull) res.status(400);
  console.log("TYPE: ", req.query.type);
  if (req.query.type == "GETMEDIA") {
    const media = await dbClient.query(`SELECT * from media`);
    await dbClient.clean();
    res.status(200).json(media.rows);
  } else if (req.query.type == "UPLOAD") {
    if (isDateNull) {
      res.send({ error: "DATE parameter not given" });
    }
    if (isImageURLNull) {
      res.send({ error: "IMAGE URL parameter not given" });
    }
  }
};

export default handler;
