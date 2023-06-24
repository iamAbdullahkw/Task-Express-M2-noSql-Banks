const { model, Schema } = require("mongoose");

const accountSchema = new Schema(
  {
    username: { type: String, required: true },
    funds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Account", accountSchema);
