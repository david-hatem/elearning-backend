const mongoose = require("mongoose");
const { Schema } = mongoose;

const mainNotes = new Schema(
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

module.exports = mongoose.model("MainNotes", mainNotes);
