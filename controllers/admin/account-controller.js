const Account = require("../../models/accout.model");
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

module.exports.createGet = (req, res) => {
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Create Account Page",
  });
};
