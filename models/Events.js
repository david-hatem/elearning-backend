const mongoose = require("mongoose");
const { Schema } = mongoose;

const event = new Schema(
  {
    button: String,
    scroll: String,
    algorithm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Algorithm",
    },
    userSchema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", event);
