import type { NextApiRequest, NextApiResponse } from "next";
import { dbConn } from "../../../../src/utils";

const dbClient = dbConn();

type Data = {
  message?: string;
  data?: any;
  error: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await dbClient.connect();
    const isJetracerNull = req.query.JETRACER == null ? true : false;
    const isUrlNull = req.query.URL == null ? true : false;
    const currentDate = new Date();

    if (isJetracerNull && isUrlNull)
      res.status(400).json({
        message: "JETRACER ID and URL parameter not given",
        error: true,
      });

    if (isJetracerNull)
      res
        .status(400)
        .json({ message: "JETRACER ID parameter not given", error: true });

    if (isUrlNull)
      res.status(400).json({ message: "URL parameter not given", error: true });

    const jetracerExist = await dbClient.query(
      `SELECT * FROM jetracer WHERE "id" = $1`,
      [req.query.JETRACER],
    );

    if (jetracerExist.rows.length === 0)
      res
        .status(400)
        .json({ message: "Jetracer ID does not exist", error: true });

    await dbClient.query(
      `INSERT INTO media ("jetracerId","url","date") VALUES($1, $2, $3)`,
      [req.query.JETRACER, req.query.URL, currentDate.toISOString()],
    );

    res.status(200).json({
      message: `Media entry successfully created for Jetracer ID: ${req.query.JETRACER}`,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

export default handler;
