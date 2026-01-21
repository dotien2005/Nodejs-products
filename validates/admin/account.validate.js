module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `vui lòng nhập họ tên`);
    res.redirect("/admin/accounts/create");
    return;
  }

  if (!req.body.email) {
    req.flash("error", `vui lòng nhập email`);
    res.redirect("/admin/accounts/create");
    return;
  }
  if (!req.body.password) {
    req.flash("error", `vui lòng nhập mật khẩu`);
    res.redirect("/admin/accounts/create");
    return;
  }
  next();
};
