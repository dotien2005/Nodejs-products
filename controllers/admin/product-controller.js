// Get /admin/products
const Product = require("../../models/product.models");
const filterStatusHelper = require("../../helpers/filerStatus");
module.exports.product = async (req, res) => {
  let find = {};
  // console.log(req.query.status);
  // console.log(req.query.keyword);

  // 1 Lọc theo trạng thái nếu có
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Lấy dữ liệu filterStatus từ helper
  const filterStatus = filterStatusHelper(req.query);

  // 2 Tìm kiếm theo từ khóa nếu có
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i"); // 'i' for case-insensitive
    find.title = regex;
  }

  const products = await Product.find(find);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Product Page",
    product: products,
    filterStatus: filterStatus,
    keywordPUG: keyword,
  });
};
