const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const cors = require("cors");
const express = require("express");
const pool = require("./config/database");
const signupRoutes = require("./modules/signup/routes");
const loginRoutes = require("./modules/login/routes");
const profileRoutes = require("./modules/profile/routes");
const favoritesRoutes = require("./modules/favorites/routes");

const app = express();
const port = Number(process.env.SERVER_PORT) || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use("/api/users", signupRoutes);
app.use("/api/users", loginRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/users", favoritesRoutes);

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", message: "Movie Info API is running" });
});

app.get("/api/health/database", async (request, response) => {
  try {
    const result = await pool.query(`SELECT current_database() AS database_name, current_user AS connected_user, NOW() AS server_time`);
    response.json({ status: "ok", database: result.rows[0] });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(500).json({ status: "error", message: "Unable to connect to PostgreSQL" });
  }
});

async function startServer() {
  try {
    const result = await pool.query(`SELECT current_database() AS database_name, current_user AS connected_user`);
    console.log(`Connected to database "${result.rows[0].database_name}" as "${result.rows[0].connected_user}"`);
    app.listen(port, () => console.log(`Movie Info API running at http://localhost:${port}`));
  } catch (error) {
    console.error("Unable to start the API:", error.message);
    process.exit(1);
  }
}

startServer();
