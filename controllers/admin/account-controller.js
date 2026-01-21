const Account = require("../../models/accout.model");

const md5 = require("md5");
// GET /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const accounts = await Account.find(find);
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Accounts Page",
    recordAccounts: accounts,
  });
};

// GET /admin/accounts/create
module.exports.createGet = (req, res) => {
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Create Account Page",
  });
};

// POST /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  const records = new Account(req.body);
  await records.save();

  res.redirect("/admin/accounts");
};
