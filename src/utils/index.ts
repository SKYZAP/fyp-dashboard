const ServerlessClient = require("serverless-postgres");
import fs from "fs";
const { google } = require("googleapis");

export const dbConn = () => {
  const client = new ServerlessClient({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    debug: true,
    delayMs: 3000,
    maxConnections: 10,
    connUtilization: 0.8,
    minConnectionIdleTimeSec: 0.5,
    ssl: { rejectUnauthorized: false },
  });
  return client;
};

export const googleClient = () => {
  const fs = require("fs");
  const path = require("path");
  const readline = require("readline");
  const { google } = require("googleapis");
  const { authenticate } = require("@google-cloud/local-auth");

  const drive = google.drive("v3");

  async function runSample(fileName) {
    // Obtain user credentials to use for the request
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, "./token.json"),
      scopes: "https://www.googleapis.com/auth/drive.file",
    });
    google.options({ auth });

    const fileSize = fs.statSync(fileName).size;
    const res = await drive.files.create(
      {
        requestBody: {
          // a requestBody element is required if you want to use multipart
        },
        media: {
          body: fs.createReadStream(fileName),
        },
      },
      {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / fileSize) * 100;
          readline.clearLine(process.stdout, 0);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${Math.round(progress)}% complete`);
        },
      },
    );
    console.log(res.data);
    return res.data;
  }
};
