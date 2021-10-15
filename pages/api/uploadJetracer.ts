import type { NextApiRequest, NextApiResponse } from "next";
const formidable = require("formidable-serverless");
import fs from "fs";

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
  const form = new formidable.IncomingForm();
  form.uploadDir = "./upload";
  form.keepExtensions = true;
  form.keepFilename = true;
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });
  form.on("file", function (name, file) {
    console.log("FF: ", file);
  });
  // console.log("FORM: ", form);
  // console.log("REQ: ", req.readable);
  res.status(200).json({ file: `${req.body}` });
};

export default handler;
