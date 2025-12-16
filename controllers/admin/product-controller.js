// Get /admin/products
const Product = require("../../models/product.models");
module.exports.product = async (req, res) => {
  const products = await Product.find({});
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Product Page",
    product: products,
  });
};
