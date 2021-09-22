// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConn from "../../src/utils";

const dbClient = dbConn();

type Data = {
  ip?: string;
  mac?: string;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbClient.connect();

  let result;
  const isTypeNull = req.query.type == null ? true : false;
  const isIpNull = req.query.ip == null ? true : false;
  const isMacNull = req.query.mac == null ? true : false;

  if (isTypeNull) res.status(400);

  if (req.query.type == "CREATE") {
    if (isIpNull) {
      res.send({ error: "IP parameter not given" });
    } else if (isMacNull) {
      res.send({ error: "MAC parameter not given" });
    } else {
      const jetracerExist = await dbClient.query(
        `SELECT * FROM jetracer WHERE "ipAddress" = $1 AND "macAddress" = $2`,
        [req.query.ip, req.query.mac],
      );
      await dbClient.clean();
      if (jetracerExist.rowCount == 0) {
        result = await dbClient.query(
          `INSERT INTO jetracer ("ipAddress","macAddress") VALUES ($1,$2)`,
          [req.query.ip, req.query.mac],
        );
        await dbClient.clean();
        res.status(200).json(result.rows[0]);
      }
      res.send({ error: "Entry exists" });
    }
  } else if (req.query.type == "SELECT") {
    if (isIpNull) {
      res.send({ error: "IP parameter not given" });
    } else {
      result = await dbClient.query(
        `SELECT * FROM jetracer WHERE "ipAddress" = $1`,
        [req.query.ip],
      );
      await dbClient.clean();
      res.status(200).json(result.rows);
    }
  } else if (req.query.type == "GETLATEST") {
    result = await dbClient.query(
      `SELECT * FROM jetracer ORDER BY id DESC LIMIT 1`,
    );
    await dbClient.clean();
    res.status(200).json(result.rows[0]);
  }
};

export default handler;
