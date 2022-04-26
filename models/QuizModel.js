const mongoose = require("mongoose");
const { Schema } = mongoose;

const quiz = new Schema({
  question: [
    {
      text: String,
      choices: [{ type: String }],
      anxIdx: Number,
      why: String,
    },
  ],
  algorithm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Algorithm",
  },
});

module.exports = mongoose.model("Quiz", quiz);
