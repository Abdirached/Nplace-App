const { Sequelize } = require("sequelize");
require("dotenv").config();

// Single shared database connection for the whole server.
// Credentials come from environment variables only (see .env.example).
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.HOST, dialect: process.env.DIALECT }
);

module.exports = sequelize;
