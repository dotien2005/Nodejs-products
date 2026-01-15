const express = require("express");

// 1
const multer = require("multer");
const upload = multer();

const router = express.Router();

const controller = require("../../controllers/admin/productCategory-Controller");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud");

// -----------------------------------------
router.get("/", controller.productCategory);
router.get("/create", controller.create);

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
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

module.exports = router;
