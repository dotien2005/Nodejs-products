const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/productCategory-Controller");

router.get("/", controller.productCategory);
router.get("/create", controller.create);

module.exports = router;
