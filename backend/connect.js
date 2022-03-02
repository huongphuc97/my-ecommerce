const mysql = require("mysql");

const conn = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b4bbac3e9e7668",
  password: "035afa62",
  database: "heroku_9d151b3a3cece41",
});

module.exports = conn;
