// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConn from "../../src/utils";

const dbClient = dbConn();

type Data = {
  ip: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbClient.connect();
  const result = await dbClient.query(
    `SELECT * FROM jetracer WHERE "ipAddress" = $1`,
    [req.query.ip],
  );
  console.log(req.query.ip);
  await dbClient.clean();
  // console.log(req.query);
  // res.status(200).json({ name: `${req.query.name}` });
  res.status(200).json(result.rows[0]);
};

export default handler;
