const mongoose = require("mongoose");
const { Schema } = mongoose;

const analysis = new Schema(
  {
    email: String,
    Movements: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysis);
