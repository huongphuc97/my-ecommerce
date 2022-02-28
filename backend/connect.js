const mysql = require("mysql");

const conn = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b26c41b635b398",
  password: "55b6d810",
  database: "heroku_46c32b902f4dd91",
});
conn.connect();
module.exports = conn;
