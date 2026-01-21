const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud");
// --
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account-controller");
const validate = require("../../validates/admin/account.validate");

// ---------------------
router.get("/", controller.index);

router.get("/create", controller.createGet);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost,
);

module.exports = router;
