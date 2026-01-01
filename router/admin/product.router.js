const express = require("express");
const router = express.Router();
//1 sử dụng package :multer để cập nhật ảnh
const multer = require("multer");
//  dest trỏ tới thư mục cấp cao nhất
const storageMulter = require("../../helpers/strongMulter");
const upload = multer({ storage: storageMulter() });
//-1 ---
const controller = require("../../controllers/admin/product-controller");

router.get("/", controller.product);
//  đổi phương thức từ get thành patch nhờ method-ovveride
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
// thêm tính năng upload của multer
router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;
