import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ip?: string;
  mac?: string;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};

export default handler;
