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

    if (isIDNull)
      res.status(400).json({ message: "ID parameter not given", error: true });

    const jetracerExist = await dbClient.query(
      `SELECT * FROM jetracer WHERE "id" = $1`,
      [req.query.ID],
    );
    await dbClient.clean();

    if (jetracerExist.rows.length === 0)
      res.status(400).json({ message: "ID not found", error: true });

    if (jetracerExist) {
      await dbClient.query(`DELETE FROM jetracer WHERE "id"= $1`, [
        req.query.ID,
      ]);
      await dbClient.clean();
      res.status(200).json({
        message: `Successfully deleted jetracer with ID: ${jetracerExist.rows[0].id}`,
        error: false,
      });
    }
    res.status(400).json({ error: true, message: "ID does not exist" });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

export default handler;
