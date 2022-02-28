const conn = require("../connect");
module.exports = function (app) {
  app.get("/orders", function (request, response) {
    let sql = "SELECT * FROM orders";
    conn.query(sql, function (err, data) {
      response.send({
        myData: data,
        result: data.length ? 200 : "",
      });
    });
  });

  app.get("/orders/:id", function (request, response) {
    let sql = "SELECT * FROM orders WHERE user_id = ?";
    conn.query(sql, request.params.id, function (err, data) {
      response.send({
        myData: data,
        result: data.length ? 200 : "",
      });
    });
  });

  app.get("/orders/get/:id", function (request, response) {
    let sql = "SELECT *, DATE_FORMAT(created_at, '%M %e %Y') as created FROM orders WHERE order_code = ?";
    conn.query(sql, request.params.id, function (err, data) {
      response.send({
        myData: data,
        result: data.length ? 200 : "",
      });
    });
  });

  app.post("/orders", function (request, response) {
    let sql = "INSERT INTO orders SET ? WHERE user_id =?",;
    conn.query(sql, request.body, function (err, data) {
      conn.query('UPDATE orders SET order_code = SUBSTRING(MD5(RAND())FROM 1 FOR 14)', request.params.id, function (err2, data2){
        response.send({
          result: data,
        })
      });
    });
  });
};
