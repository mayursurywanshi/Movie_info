const { Pool } = require("pg");

const requiredEnvironmentVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (variable) => !process.env[variable]
);

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Missing database configuration: ${missingEnvironmentVariables.join(", ")}`
  );
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
