const mysql = require("mysql");

const conn = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bc408fac7d4292",
  password: "3dde473b",
  database: "heroku_2e539974a7dade4",
});

module.exports = conn;
