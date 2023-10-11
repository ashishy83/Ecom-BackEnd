const mongoose = require("mongoose");

const productCategories = ["Laptops", "mobiles", "Ipads", "Accessories"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
      maxlength: 30,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: productCategories,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      required: [true, "Image isrequired"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    oprice: {
      type: Number,
      required: [true, "Product price is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //reference to user model
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);


const Product = model.model('product',productSchema);
export default Product;