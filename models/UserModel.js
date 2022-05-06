const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const valid = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");
// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (val) => {
          return valid.isEmail(val);
        },
        message: "{VALUE} not valid",
      },
    },
    quizestaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    password: { type: String, required: true, minlength: 5 },
    // isIns: { type: Boolean },
  },
  { timestamps: true }
);

userSchema.method("genAuthToken", function () {
  const token = jwt.sign(
    // { usrid: this._id, insRole: this.isIns },
    { usrid: this._id },
    config.get("jwtsec")
  );
  return token;
});

module.exports = mongoose.model("User", userSchema);
