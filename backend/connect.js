const mysql = require("mysql");

const conn = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b765241be206c8",
  password: "863c3701",
  database: "heroku_52951fb7089a6ac",
});

module.exports = conn;
