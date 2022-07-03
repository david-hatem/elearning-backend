const mongoose = require("mongoose");
const { Schema } = mongoose;

const algorithm = new Schema(
  {
    path: String,
    title: String,
    intro: String,
    robot: String,
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    quizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    mainNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "MainNotes" }],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Algorithm", algorithm);
