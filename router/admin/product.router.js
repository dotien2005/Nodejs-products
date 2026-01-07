const express = require("express");
const router = express.Router();
//1 sử dụng package :multer để cập nhật ảnh
const multer = require("multer");
// biến dest trỏ tới thư mục cấp cao nhất
// const storageMulter = require("../../helpers/strongMulter");  { storage: storageMulter() }
const upload = multer();
//-1 ---
// 2 :Validate dữ liệu
const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/product-controller");
// 3 .upload cloud
const uploadCloud = require("../../middlewares/admin/uploadCloud");

router.get("/", controller.product);
//  đổi phương thức từ get thành patch nhờ method-ovveride
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
// thêm tính năng upload của multer
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
