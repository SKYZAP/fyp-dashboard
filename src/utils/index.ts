const ServerlessClient = require("serverless-postgres");

const dbConn = () => {
  const client = new ServerlessClient({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    debug: true,
    delayMs: 3000,
    ssl: { rejectUnauthorized: false },
  });
  return client;
};

export default dbConn;
