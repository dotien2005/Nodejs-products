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

// -- [POST] admin/products-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  res.send("ok");
};
