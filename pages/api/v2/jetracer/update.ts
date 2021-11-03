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
    const isIDNull = req.query.ID == null ? true : false;
    const isMACNull = req.query.MAC == null ? true : false;
    const isIPNull = req.query.IP == null ? true : false;

    if (isIDNull)
      res.status(400).json({ message: "ID parameter not given", error: true });

    const jetracerExist = await dbClient.query(
      `SELECT * FROM jetracer WHERE "id" = $1`,
      [req.query.ID],
    );
    await dbClient.clean();
    if (jetracerExist) {
      if (isMACNull && isIPNull) {
        res.status(400).json({
          message: "You must provide either IP or MAC Address to update",
          error: true,
        });
      } else if (isIPNull) {
        await dbClient.query(
          `UPDATE jetracer SET "macAddress"=$1 WHERE "id"=$2`,
          [req.query.MAC, req.query.ID],
        );
        await dbClient.clean();
      } else if (isMACNull) {
        await dbClient.query(
          `UPDATE jetracer SET "ipAddress"=$1 WHERE "id"=$2`,
          [req.query.IP, req.query.ID],
        );
        await dbClient.clean();
      } else {
        await dbClient.query(
          `UPDATE jetracer SET "macAddress"=$1, "ipAddress"=$2 WHERE "id"=$3`,
          [req.query.MAC, req.query.IP, req.query.ID],
        );
        await dbClient.clean();
      }
      res.status(200).json({
        message: `Successfully updated entry for ID: ${req.query.ID}`,
        error: false,
      });
    }
    res.status(400).json({ error: true, message: "ID does not exist" });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

export default handler;
