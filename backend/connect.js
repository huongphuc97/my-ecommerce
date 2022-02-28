const mysql = require("mysql");
const dbConfig = require("./db.js");

const conn = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

module.exports = conn;
