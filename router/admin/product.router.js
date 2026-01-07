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
//  cloud
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dcoujkven",
  api_key: "558121248779264",
  api_secret: "YnRpvuwz74HVJesDSjkG41CaifE", // Click 'View API Keys' above to copy your API secret
});
// end  cloud

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
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        // console.log(result);
        // console.log(req.file);
        req.body[req.file.fieldname] = result.url;
        next();
      }
      upload(req);
    } else {
      next();
    }
  },
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
