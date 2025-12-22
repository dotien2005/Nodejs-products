// Get /admin/products
const Product = require("../../models/product.models");
const filterStatusHelper = require("../../helpers/filerStatus");
const searchHelper = require("../../helpers/search");

module.exports.product = async (req, res) => {
  let find = {};
  // console.log(req.query.status);
  // console.log(req.query.keyword);

  // 1.1 Lấy dữ liệu filterStatus từ helper
  const filterStatus = filterStatusHelper(req.query);
  // 1 Lọc theo trạng thái nếu có
  if (req.query.status) {
    find.status = req.query.status;
  }

  // 2 Lấy dữ liệu tìm kiếm từ helper
  const objeactSearch = searchHelper(req.query);
  // console.log(objeactSearch);

  // 2.1 Tìm kiếm theo từ khóa nếu có

  if (objeactSearch.keyword) {
    find.title = objeactSearch.title;
  }

  // Pagination : phân trang

  let objeactPagination = {
    limitItem: 7,
    currentPage: 1,
  };

  if (req.query.page) {
    objeactPagination.currentPage = parseInt(req.query.page);
  }
  objeactPagination.skip =
    (objeactPagination.currentPage - 1) * objeactPagination.limitItem;
  // console.log(objeactPagination.currentPage);

  // đếm sản phẩm trong db
  const countProduct = await Product.countDocuments(find);
  const totalPage = countProduct / objeactPagination.limitItem;
  objeactPagination.totalPage = Math.ceil(totalPage);

  // end Pagination

  const products = await Product.find(find)
    .limit(objeactPagination.limitItem)
    .skip(objeactPagination.skip);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Product Page",
    product: products,
    filterStatus: filterStatus,
    keywordPUG: objeactSearch.keyword,
    pagination: objeactPagination,
  });
};
