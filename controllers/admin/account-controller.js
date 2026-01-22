const Account = require("../../models/accout.model");
const Role = require("../../models/roles.models.js");
const md5 = require("md5");
const systemConfig = require("../../config/system");

// GET /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Account.find(find).select("-password -token");
  console.log(records);
  // hiển thị role

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Accounts Page",
    accounts: records,
  });
};

// GET /admin/accounts/create
module.exports.createGet = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Create Account Page",
    recordsRole: records,
  });
};

// POST /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExist) {
    req.flash(
      "error",
      `Email ${req.body.email} đã tồn tại, vui lòng sử dụng email khác!`,
    );
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  } else {
    req.body.password = md5(req.body.password);
    const records = new Account(req.body);
    await records.save();
    req.flash("success", "Tạo tài khoản thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  }
};
