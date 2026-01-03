module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `vui lòng nhập tiêu đề`);
    res.redirect("/admin/products/create");
    return;
  }
  next();
};
