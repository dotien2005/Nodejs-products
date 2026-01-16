const Role = require("../../models/roles.models");
// [GET] /admin/roles
module.exports.index = (req, res) => {
  let find = {
    deleted: false,
  };
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Roles Page",
  });
};
