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

    const result = await dbClient.query(`SELECT * FROM jetracer`);
    await dbClient.clean();

    res.status(200).json({ data: result.rows, error: false });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

export default handler;
