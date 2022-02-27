const { body, validationResult } = require("express-validator");

const csrf = require("csurf");

const bodyParser = require("body-parser");

const express = require("express");

const cors = require("cors");

const app = express();

const path = require("path");

// const csrfProtection = csrf({ cookie: true });

// const parseForm = bodyParser.urlencoded({ extended: false });

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

require("./routes/admin/AdminRoute")(app);
require("./routes/authen")(app);
require("./routes/category")(app);
require("./routes/favourite")(app);
require("./routes/product")(app);
require("./routes/cart")(app);
require("./routes/review")(app);
require("./routes/order")(app);

app.listen(PORT, function () {
  console.log("http://localhost:3000");
});
