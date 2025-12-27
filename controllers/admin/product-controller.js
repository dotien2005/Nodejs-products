// Get /admin/products
const Product = require("../../models/product.models");
const filterStatusHelper = require("../../helpers/filerStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// controllers/admin/product-controller.jS
// Get /admin/products
module.exports.product = async (req, res) => {
  let find = {
    // deleted: true,
  };
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
  const countProduct = await Product.countDocuments(find);

  let objeactPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 7,
    },
    req.query,
    countProduct
  );

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

// Controllers Change Status
// Patch /admin/products/change-status/:status/:id

module.exports.changeStatus = async (req, res) => {
  // tạo id và status
  const status = req.params.status;
  const id = req.params.id;
  // cập nhật id và status
  await Product.updateOne({ _id: id }, { status, status });
  // dùng để chuyển hướng về lại links
  res.redirect("/admin/products");
};

module.exports.changeMulti = async (req, res) => {
  // console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  // console.log(ids);
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });

      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });

      break;

    default:
      break;
  }
  res.redirect("/admin/products");
};

//4 Controllers Deltete Item
// [Delete] /admin/products/delete/id
module.exports.deleteItem = async (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  // xóa vĩnh viễn
  // await Product.deleteOne({ _id: id });
  //  xóa mềm còn trong data , yêu cầu find : phải tìm các sp có trạng thái deleted : false
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  res.redirect("/admin/products");
};
