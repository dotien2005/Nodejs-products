const Product = require("../../models/product.models.js");
// GET /products
module.exports.products = async (req, res) => {
  const products = await Product.find({}).sort({ position: "desc" });
  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(2);
    return item;
  });

  res.render("client/pages/products/index.pug", {
    pageTitle: "Product Page",
    product: newProducts,
  });
};
// GET /products/:slug
module.exports.detail = async (req, res) => {
  // console.log(req.params.slug);

  try {
    const find = {
      // deleted: false,
      slug: req.params.slug,
      // status: "acitve",
    };
    const product = await Product.findOne(find);
    console.log(product);
    res.render("client/pages/products/detail.pug", {
      pageTitle: "Detail Page",
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
