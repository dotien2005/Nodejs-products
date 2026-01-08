// [GET] /admin/product-category
module.exports.productCategory = (req, res) => {
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Product Category",
  });
};

// [GET] /admin/product-category
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Create Category",
  });
};
