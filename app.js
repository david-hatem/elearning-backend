const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/User");

const Algorithm = require("./models/AlgorithmModel");
const Feedback = require("./models/FeedbackModel");
const MainNotes = require("./models/MainNotesModel");
const Quiz = require("./models/QuizModel");
const Topics = require("./models/TopicsModel");
const User = require("./models/UserModel");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
const port = process.env.PORT || 3000;
// dotenv.config();
// Database
mongoose
  // .connect(process.env.MONGO_URL)
  .connect(
    "mongodb+srv://david:12345@cluster0.yq4ko.mongodb.net/elearning?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
