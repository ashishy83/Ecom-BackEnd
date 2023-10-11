const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    licenseId: {
      type: String,
      required: [true, "License Id is required"],
    },
  },
  {
    timestamps: true,
  }
);


const Merchant = mongoose.model('merchant',merchantSchema);
module.exports = Merchant;