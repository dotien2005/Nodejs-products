const productRouter = require("./product.router");
const homerRouter = require("./home.router");
module.exports = (app) => {
  // home router
  app.use("/", homerRouter);
  // product router
  app.use("/products", productRouter);
};
