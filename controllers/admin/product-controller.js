// Get /admin/products
const Product = require("../../models/product.models");
module.exports.product = async (req, res) => {
  // console.log(req.query.status);

  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  let find = {};

  // Lọc theo trạng thái nếu có
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Cập nhật class active cho filterStatus
  if (req.query.status) {
    const indexStatus = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    // console.log(indexStatus);
    filterStatus[indexStatus].class = "active";
  } else {
    const indexStatus = filterStatus.findIndex((item) => item.status == "");
    // console.log(indexStatus);
    filterStatus[indexStatus].class = "active";
  }

  const products = await Product.find(find);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Product Page",
    product: products,
    filterStatus: filterStatus,
  });
};
