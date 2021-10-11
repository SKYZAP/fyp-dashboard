import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ip?: string;
  mac?: string;
  file?: any;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("IMAGE: ", req);
  res.status(200).json({ file: `` });
};

export default handler;
