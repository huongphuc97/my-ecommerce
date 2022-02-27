const mysql = require("mysql");

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database: 'fullproject',
//     multipleStatements: true
// });

const conn = require("serverless-mysql")({
  config: {
    host: process.env.ENDPOINT,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn;
