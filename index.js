const express = require("express");
// 7 đè phương thức
const methodOverride = require("method-override");
// 8 lấy dữ liệu từ body
const bodyParser = require("body-parser");
// 9 show thông báo
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
//7
app.use(methodOverride("_method"));
//8
app.use(bodyParser.urlencoded());
// 9 FLASH
app.use(cookieParser("AHBCĐNDAER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//END 9 FLASH

//  3 config dotenv để sử dụng biến môi trường
require("dotenv").config();
const port = process.env.PORT;

// 5 database mongoose -  phải đứng sau require dotenv
const database = require("./config/database.js");
database.connect();
//--
console.log(__dirname);
// 1  using template engines express
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//4 static files

app.use(express.static(`${__dirname}/public`));

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
