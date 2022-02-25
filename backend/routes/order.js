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
    let sql = "INSERT INTO orders SET ?";
    conn.query(sql, request.body, function (err, data) {
      response.send({
        result: data,
      });
    });
  });
};
