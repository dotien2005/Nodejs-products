// [GET] /admin/roles
module.exports.index = (req, res) => {
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Roles Page",
  });
};
