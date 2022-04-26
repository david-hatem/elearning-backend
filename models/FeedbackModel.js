const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedback = new Schema(
  {
    scoreRating: Number,
    feedbackText: String,
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

module.exports = mongoose.model("Feedback", feedback);
