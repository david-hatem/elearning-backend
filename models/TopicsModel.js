const mongoose = require("mongoose");
const { Schema } = mongoose;

const topic = new Schema(
  {
    subTitle: String,
    text: String,
    algorithm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Algorithm",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topic);
