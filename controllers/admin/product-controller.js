// Get /admin/products
const Product = require("../../models/product.models");
const filterStatusHelper = require("../../helpers/filerStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// ---
const systemConfig = require("../../config/system");
// ---

// ---[Get] /admin/products
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

  // ------sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    // sort.price = "des",
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  // End sort

  const products = await Product.find(find)
    .sort(sort)
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
// ---2 [Patch] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // tạo id và status
  const status = req.params.status;
  const id = req.params.id;
  // cập nhật id và status
  await Product.updateOne({ _id: id }, { status, status });
  req.flash("changeStatus", "cập nhật trạng thái thành công");
  // dùng để chuyển hướng về lại links
  res.redirect("/admin/products");
};
//  -- cập nhật trạng thái sản phẩm
module.exports.changeMulti = async (req, res) => {
  // console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  // console.log(ids);
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "changeStatus",
        `${ids.length} sản phẩm đã được cập nhật trạng thái`
      );

      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "changeStatus",
        `${ids.length} sản phẩm đã được cập nhật trạng thái`
      );
      break;

    // xóa mềm
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: "true", deletedAt: new Date() }
      );
      req.flash("changeStatus", `${ids.length} sản phẩm đã được Xóa`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        // loai bỏ dấu gạch -
        // console.log(item.split("-"));
        position = parseInt(position);
        // console.log(id);
        // console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
        req.flash("changeStatus", `${ids.length} sản phẩm đã được đổi vị trí`);
      }
      break;

    default:
      break;
  }
  res.redirect("/admin/products");
};

//4 Controllers Deltete Item ---- Xóa luôn khỏi data
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
  req.flash(
    "changeStatus",
    `${ids.length} sản phẩm đã được Xóa Hoàn toàn data`
  );
  res.redirect("/admin/products");
};
// -- [GET] admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Create Products",
  });
};

// -- [POST] admin/products/create
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  // --validate dữ liệu 1

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  //  -- xử lý logic thứ tự--
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
    // console.log(req.body.position);
  } else {
    req.body.position = parseInt(req.body.position);
  }
  //  --end xử lý logic thứ tự--

  // link cho ảnh được lưu vào thư mục uploads
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }

  // -- lưu vào db
  const product = new Product(req.body);
  await product.save();
  // --
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] : admin/products/edit
module.exports.edit = async (req, res) => {
  try {
    // console.log(req.params.id);
    const find = {
      // deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    // console.log(product);
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Edit Products",
      product: product,
    });
  } catch (error) {
    req.flash("error", `lỗi id sản phẩm`);

    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] : admin/products/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  //  -- xử lý logic thứ tự--
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
    // console.log(req.body.position);
  } else {
    req.body.position = parseInt(req.body.position);
  }
  //  --end xử lý logic thứ tự--
  // link cho ảnh được lưu vào thư mục uploads
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", `CẬP NHẬT SẢN PHẨM THÀNH CÔNG`);
  } catch (error) {}
  res.redirect(`${systemConfig.prefixAdmin}/products/edit/${id}`);
};

// [GET] : admin/products/detail
module.exports.detail = async (req, res) => {
  try {
    // console.log(req.params.id);
    const find = {
      // deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    // console.log(product);
    res.render("admin/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", `lỗi id sản phẩm`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
