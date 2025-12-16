const dashboardRouters = require("./dashboard.router");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRouters);
};
