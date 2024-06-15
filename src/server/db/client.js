require('dotenv').config();
const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/wrpl_ecommerce';


const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;

