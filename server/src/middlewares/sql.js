const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const sql = mysql.createConnection({
  user: process.env.SQL_USER,
  host: process.env.SQL_HOST,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
});

module.exports = sql;
