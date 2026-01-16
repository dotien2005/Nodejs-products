const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema(
  {
    title: String,
    pemission: {
      type: Array,
      default: [],
    },
    description: String,

    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // hiển thị thời gian
    timestamps: true,
  }
);

const Role = mongoose.model("Role", RoleSchema, "roles");

module.exports = Role;
