const mongoose = require("mongoose");
const { Schema } = mongoose;

const algorithm = new Schema(
  {
    title: String,
    intro: String,
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topics" }],
    // quizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    mainNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "MainNotes" }],
    // feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Algorithm", algorithm);
