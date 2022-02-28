const { body, validationResult } = require("express-validator");

const csrf = require("csurf");

const bodyParser = require("body-parser");

const express = require("express");

const cors = require("cors");

const app = express();

const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

// require("./routes/admin/AdminRoute");
// require("./routes/authen")(app);
// require("./routes/category")(app);
// require("./routes/favourite")(app);
// require("./routes/cart")(app);
// require("./routes/review")(app);
// require("./routes/order")(app);

////// AUTHEN

const conn = require("./connect");
const jwt = require("jsonwebtoken");
const authPage = require("./routes/authorize");

app.post("/accounts/login", function (request, response) {
  let sql = "SELECT * FROM account WHERE username = ? AND password = ?";
  conn.query(
    sql,
    [request.body.username, request.body.password],
    function (err, data) {
      conn.query(
        "UPDATE account SET last_login = now() WHERE username = ? AND password = ?",
        [request.body.username, request.body.password],
        function (err2, data2) {
          jwt.sign({ user: data }, "secretkey", function (err, token) {
            response.send({
              token: token,
            });
          });
        }
      );
    }
  );
});

app.get("/accounts/get", verifyToken, function (request, response) {
  jwt.verify(request.token, "secretkey", function (err, data) {
    response.send({
      myData: data ? data.user[0] : null,
    });
  });
});

app.get("/accounts", function (request, response) {
  let sql = "SELECT * FROM account";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
    });
  });
});

function verifyToken(request, response, next) {
  var bearHeader = request.headers["authorization"];
  if (typeof bearHeader !== "undefined") {
    var bearHeader = bearHeader.split(" ")[1];
    request.token = bearHeader;
    next();
  } else {
    response.sendStatus(403);
  }
}

app.post("/accounts/create", authPage("admin"), function (request, response) {
  let sql = "INSERT INTO account SET ?";
  conn.query(sql, request.body, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

app.put("/accounts/:id", authPage("admin"), function (request, response) {
  let sql = "UPDATE account SET ? WHERE id = ?";
  conn.query(sql, [request.body, request.params.id], function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.delete("/accounts/:id", authPage("admin"), function (request, response) {
  let sql = "DELETE FROM account WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

////////////////////////// CART

app.get("/cart", function (request, response) {
  let sql = "SELECT * FROM cart ORDER BY name ASC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
    });
  });
});

app.get("/cart/:id", function (request, response) {
  let sql = "SELECT * FROM cart WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      myData: data[0],
    });
  });
});

app.post("/cart", function (request, response) {
  let sql = "INSERT INTO cart SET ?";
  conn.query(sql, request.body, function (err, data) {
    response.send({
      result: data,
    });
  });
});

app.put("/cart/:id", function (request, response) {
  let sql = "UPDATE cart SET ? WHERE id = ?";
  conn.query(sql, [request.body, request.params.id], function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.delete("/cart", function (request, response) {
  let sql = "DELETE FROM cart";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data,
    });
  });
});

app.delete("/cart/:id", function (request, response) {
  let sql = "DELETE FROM cart WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

//////////////////////category////////////////

app.get("/categories", authPage("admin"), function (request, response) {
  let sql = "SELECT * FROM category";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/categories/:id", function (request, response) {
  let sql = "SELECT * FROM category WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      myData: data[0],
      result: data.length ? 200 : "",
    });
  });
});

app.post("/categories", authPage("admin"), function (request, response) {
  let sql = "INSERT INTO category SET ?";
  conn.query(sql, request.body, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

app.put("/categories/:id", function (request, response) {
  let sql = "UPDATE category SET ? WHERE id = ?";
  conn.query(sql, [request.body, request.params.id], function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.delete("/categories/:id", function (request, response) {
  let sql = "DELETE FROM category WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

/////////////////////////////favourite

app.get("/favourites", function (request, response) {
  let sql =
    "SELECT f.*, c.name as category FROM favourite f JOIN category c ON f.category_id = c.id";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.post("/favourites", function (request, response) {
  let sql = "INSERT INTO favourite SET ?";
  conn.query(sql, request.body, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

app.put("/favourites/:id", function (request, response) {
  let sql = "UPDATE favourite SET ? WHERE id = ?";
  conn.query(sql, [request.body, request.params.id], function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.delete("/favourites", function (request, response) {
  let sql = "DELETE FROM favourite";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

app.delete("/favourites/:id", function (request, response) {
  let sql = "DELETE FROM favourite WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

//////////ORDER
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
  let sql =
    "SELECT *, DATE_FORMAT(created_at, '%M %e %Y') as created FROM orders WHERE order_code = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      myData: data,
    });
  });
});

app.post("/orders", function (request, response) {
  let sql = "INSERT INTO orders SET ?";
  conn.query(sql, request.body, function (err, data) {
    conn.query('UPDATE orders SET order_code = SUBSTRING(MD5(RAND())FROM 1 FOR 14) WHERE user_id = ?',request.params.id, function (err2, data2){
      response.send({
        result: data,
      })
    });
  });
});

///////////////////////////////////////////PRODUCT
const upload = require("./upload");

app.get("/products", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/search/bykey/:name", function (request, response) {
  request.params.name = "%" + request.params.name + "%";
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.name LIKE ? ORDER BY p.id ASC";
  conn.query(sql, request.params.name, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/sort/newest", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id DESC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/sort/oldest", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/sort/highprice", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.price DESC ";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/sort/lowprice", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.price ASC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/range/:from,:to", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.price BETWEEN ? AND ? ORDER BY p.price DESC";
  conn.query(
    sql,
    [request.params.from, request.params.to],
    function (err, data) {
      response.send({
        myData: data,
        result: data.length ? 200 : "",
      });
    }
  );
});

app.get("/products/women", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 3";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/women/page/:id", function (request, response) {
  conn.query("SELECT COUNT(*) FROM product", function (err, data) {
    var perPageWomen = 9;
    var fullData = Object.values(data[0]);
    fullData.forEach((totalItems) => {
      if (request.params.id == 1) {
        let sql =
          "SELECT p.*, c.name as category  FROM product p JOIN category c ON p.category_id = c.id WHERE p.category_id = 3 LIMIT 9";
        conn.query(sql, function (err, data) {
          response.send({
            pageWomen: parseInt(request.params.id),
            per_pageWomen: perPageWomen,
            totalWomen: totalItems,
            total_pagesWomen: Math.floor(totalItems / perPageWomen),
            myData: data,
          });
        });
      } else if (request.params.id == 2) {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE p.category_id = 3  LIMIT 9 OFFSET 9";
        conn.query(sql, function (err, data) {
          response.send({
            pageWomen: parseInt(request.params.id),
            per_pageWomen: perPageWomen,
            totalWomen: totalItems,
            total_pagesWomen: Math.floor(totalItems / perPageWomen),
            myData: data,
          });
        });
      } else {
        let sql =
          "SELECT  p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id  WHERE p.category_id = 3 LIMIT 9 OFFSET " +
          (request.params.id - 1) * 9 +
          "";
        conn.query(sql, function (err, data) {
          response.send({
            pageWomen: parseInt(request.params.id),
            per_pageWomen: perPageWomen,
            totalWomen: totalItems,
            total_pagesWomen: Math.floor(totalItems / perPageWomen),
            myData: data,
          });
        });
      }
    });
  });
});
app.get("/products/men", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 4";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});
app.get("/products/others", function (request, response) {
  let sql =
    "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id WHERE c.id = 5";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data.length ? 200 : "",
    });
  });
});

app.get("/products/homepage=:id", function (request, response) {
  conn.query("SELECT COUNT(*) FROM product", function (err, data) {
    var perPage = 8;
    var fullData = Object.values(data[0]);
    fullData.forEach((totalItems) => {
      if (request.params.id == 1) {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      } else if (request.params.id == 2) {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8 OFFSET 8";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      } else {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 8 OFFSET " +
          (request.params.id - 1) * 8 +
          "";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      }
    });
  });
});

app.get("/products/pages=:id", function (request, response) {
  conn.query("SELECT COUNT(*) FROM product", function (err, data) {
    var perPage = 9;
    var fullData = Object.values(data[0]);
    fullData.forEach((totalItems) => {
      if (request.params.id == 1) {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      } else if (request.params.id == 2) {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9 OFFSET 9";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      } else {
        let sql =
          "SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id ORDER BY p.id ASC LIMIT 9 OFFSET " +
          (request.params.id - 1) * 9 +
          "";
        conn.query(sql, function (err, data) {
          response.send({
            page: parseInt(request.params.id),
            per_page: perPage,
            total: totalItems,
            total_pages: Math.floor(totalItems / perPage),
            myData: data,
          });
        });
      }
    });
  });
});

app.post(
  "/products",
  upload.single("image"),
  authPage("admin"),
  function (request, response) {
    const file = request.file;
    if (file) {
      request.body.image = file.filename;
    }
    let sql = "INSERT INTO product SET ?";
    conn.query(sql, request.body, function (err, data) {
      response.send({
        result: data.length ? 200 : "",
      });
    });
  }
);

app.put(
  "/products/:id",
  upload.single("image"),
  authPage("admin"),
  function (request, response) {
    const file = request.file;
    if (file) {
      request.body.image = file.filename;
    }
    let sql = "UPDATE product SET ? WHERE id = ?";
    conn.query(sql, [request.body, request.params.id], function (err, data) {
      response.send({
        myData: data,
        result: data.length ? 200 : "",
      });
    });
  }
);

app.delete("/products/:id", authPage("admin"), function (request, response) {
  let sql = "DELETE FROM product WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      result: data.length ? 200 : "",
    });
  });
});

/////////////REVIEW //////////////////////////

app.get("/review", function (request, response) {
  let sql =
    "SELECT name, email, rating, text_review, title, DAY(created_at) as day ,MONTHNAME(created_at) as month, YEAR(created_at) as year FROM review ORDER BY id DESC";
  conn.query(sql, function (err, data) {
    response.send({
      myData: data,
      result: data
    });
  });
});

app.get("/review/:id", function (request, response) {
  let sql =
    "SELECT f.*, c.name as category FROM favourite f JOIN category c ON f.category_id = c.id WHERE id = ?";
  conn.query(sql, request.params.id, function (err, data) {
    response.send({
      myData: data[0],
    });
  });
});

app.post("/review", function (request, response) {
  let sql = "INSERT INTO review SET ?";
  conn.query(sql, request.body, function (err, data) {
    response.send({
      result: data
    });
  });
});

app.listen(PORT, function () {
  console.log("http://localhost:3000");
});
