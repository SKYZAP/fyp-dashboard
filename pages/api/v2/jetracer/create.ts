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
    const isMACNull = req.query.MAC == null ? true : false;
    const isIPNull = req.query.IP == null ? true : false;

    if (isIPNull && isMACNull)
      res
        .status(400)
        .json({ message: "IP and MAC parameter not given", error: true });

    if (isIPNull)
      res.status(400).json({ message: "IP parameter not given", error: true });

    if (isMACNull)
      res.status(400).json({ message: "MAC parameter not given", error: true });

    await dbClient.query(
      `INSERT INTO jetracer ("ipAddress","macAddress") VALUES( $1, $2)`,
      [req.query.IP, req.query.MAC],
    );

    res
      .status(200)
      .json({ message: "Jetracer entry successfully created", error: false });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

export default handler;
