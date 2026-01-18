const Role = require("../../models/roles.models");

const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Roles Page",
    rolePug: records,
  });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Roles Create Page",
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);

  const record = new Role(req.body);
  await record.save();
  // res.send("Role created");
  req.flash("success", "Tạo nhóm quyền thành công");
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const dataEdit = await Role.findOne(find);
    // console.log(dataEdit);
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Roles Edit Page",
      dataEdit: dataEdit,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    // console.log(req.body);
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
  }
};
