const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
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

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
