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

  let result;
  const isTypeNull = req.query.type == null ? true : false;
  const isDateNull = req.query.date == null ? true : false;
  const isImageURLNull = req.query.url == null ? true : false;

  if (isTypeNull) res.status(400);
  if (req.query.type == "GETMEDIA") {
    const media = await dbClient.query(`SELECT * from media`);
    await dbClient.clean();
    res.status(200).json(media.rows);
  } else if (req.query.type == "UPLOAD") {
    if (isDateNull) {
      res.send({ error: "DATE parameter not given" });
    } else if (isImageURLNull) {
      res.send({ error: "IMAGE URL parameter not given" });
    } else {
      const newUrl =
        "https://drive.google.com/uc?export=view&id=" + req.query.url;
      const jetracer = await dbClient.query(`SELECT * FROM jetracer`);
      await dbClient.clean();
      result = await dbClient.query(
        `INSERT INTO media ("jetracerId","date","url") VALUES ($1,$2,$3)`,
        [jetracer.rows[jetracer.rows.length - 1].id, req.query.date, newUrl],
      );
      await dbClient.clean();
      res.status(200).json(result.rows[0]);
    }
  }
};

export default handler;
