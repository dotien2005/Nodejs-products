const ProductCategory = require("../../models/product-category.models");
// --
const systemConfig = require("../../config/system");

// [GET] /admin/product-category
module.exports.productCategory = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);

  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Product Category",
    recordPug: records,
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
  // console.log(req.body);
  if (req.body.position == "") {
    const counts = await ProductCategory.countDocuments();
    req.body.position = counts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
