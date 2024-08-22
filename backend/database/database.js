const maria = require("mariadb");
require("dotenv").config();
console.log(process.env.DB_password);

const pool = maria.createPool({
  host: process.env.DB_host,
  user: process.env.DB_users,
  password: process.env.DB_password,
  database: process.env.DB_database,
});

module.exports = { pool: pool };
