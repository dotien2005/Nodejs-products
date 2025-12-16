const express = require("express");
const app = express();

//  3 config dotenv để sử dụng biến môi trường
require("dotenv").config();
const port = process.env.PORT;

// 5 database mongoose -  phải đứng sau require dotenv
const database = require("./config/database.js");
database.connect();

// 1  using template engines express
app.set("views", "./views");
app.set("view engine", "pug");

//4 static files
app.use(express.static("public"));

// 6 app local variable
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// 2 router
const router = require("./router/client/index.router");
const adminRouter = require("./router/admin/index.router");
// 2 use router
router(app);
adminRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
