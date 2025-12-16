module.exports.dashboard = (req, res) => {
  res.render("admin/pages/home/index.pug", {
    pageTitle: "Dashboard Page",
  });
};
