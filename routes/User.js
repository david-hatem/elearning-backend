const router = require("express").Router();
const mongoose = require("mongoose");
const Algorithm = require("../models/AlgorithmModel");
const Topics = require("../models/TopicsModel");
const MainNotes = require("../models/MainNotesModel");
const Quiz = require("../models/QuizModel");
const User = require("../models/UserModel");
const validator = require("../middlewares/UserMWValidator");
const bcrypt = require("bcrypt");
const FeedbackModel = require("../models/FeedbackModel");
const AlgorithmModel = require("../models/AlgorithmModel");
const MainNotesModel = require("../models/MainNotesModel");
const TopicsModel = require("../models/TopicsModel");

router.post("/register", validator, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(400).send("Already Registered!!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      role: req.body.role,
    });
    await user.save();
    if (!config.get("jwtsec")) {
      return res.status(500).send("Token is not defined....");
    }
    const token = user.genAuthToken();
    res.header("x-auth-token", token);
    res.status(200).send("OK");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad...");
    }
  }
});
//Read One Algorithm
router.get("/getalgorithmbyid/:id", async (req,res)=>{
  let algo =await AlgorithmModel.findById(req.params.id);
  if(!algo) return res.status(404).send("Algorithm not found");
  res.send(algo);
});

//Read all algorithms
router.get("/getallalgorithms",async (req,res)=>{
  let algo = await AlgorithmModel.find({});
  res.send(algo);
});

// Create Algorithm
router.post("/createalgorithm", async (req, res) => {
  const alg = new AlgorithmModel(req.body);
  const algAdded = await alg.save();
  res.status(200).json(algAdded);
});

// Update Algorithm
router.put("/updatealgorithm/:id", async (req, res) => {
  let algo = await AlgorithmModel.findOneAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
  });
  if (!algo) return res.status(404).send("!algorithm not found");
  res.json(algo);
});

// Delete Algorithm
router.delete("/deletealgorithm/:id", async (req, res) => {
  let alg = await AlgorithmModel.findByIdAndRemove(req.params.id);
  let mn = await MainNotesModel.deleteMany({ algorithm: req.params.id });
  let t = await TopicsModel.deleteMany({ algorithm: req.params.id });
  if (!alg) {
    return res.status(404).send("Not Found..");
  }
  res.send(alg);
});

//Read One Topic
router.get("/gettopicbyid/:id", async (req,res)=>{
  let topic =await TopicsModel.findById(req.params.id);
  if(!topic) return res.status(404).send("topic not found");
  res.send(topic);
});
// Create Topic
router.post("/createtopic", async (req, res) => {
  const topic = new TopicsModel({
    subTitle: req.body.subTitle,
    text: req.body.text,
    algorithm: req.body.algorithm,
  });
  const topicAdded = await topic.save();

  const algorithm = await AlgorithmModel.findById({ _id: topic.algorithm });
  algorithm.topics.push(topicAdded);
  await algorithm.save();
  res.status(200).json(topicAdded);
});

//update topics
router.put("/updatetopics/:id", async (req, res) => {
  let topic = await TopicsModel.findOneAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
  });
  if (!topic) return res.status(404).send("!topic not found");
  res.json(topic);
});

// Delete Topic
router.delete("/deletetopics/:id", async (req, res) => {
  let topic = await TopicsModel.findByIdAndRemove(req.params.id);
  if (!topic) {
    return res.status(404).send("Not Found..");
  }
  res.send(topic);
});
//Read One note
router.get("/getnotebyid/:id", async (req,res)=>{
  let note =await TopicsModel.findById(req.params.id);
  if(!note) return res.status(404).send("note not found");
  res.send(note);
});
// Create Notes
router.post("/createmainnotes", async (req, res) => {
  const mainNotes = new MainNotesModel({
    subTitle: req.body.subTitle,
    text: req.body.text,
    algorithm: req.body.algorithm,
  });
  const mainNotesAdded = await mainNotes.save();

  const algorithm = await AlgorithmModel.findById({ _id: mainNotes.algorithm });
  algorithm.mainNotes.push(mainNotesAdded);
  await algorithm.save();
  res.status(200).json(mainNotesAdded);
});
//update notes
router.put("/updatenotes/:id", async (req, res) => {
  let note = await MainNotesModel.findOneAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
  });
  if (!note) return res.status(404).send("!note not found");
  res.json(note);
});

// Delete Notes
router.delete("/deletemainnotes/:id", async (req, res) => {
  let mn = await MainNotesModel.findByIdAndRemove(req.params.id);
  if (!mn) {
    return res.status(404).send("Not Found..");
  }
  res.send(mn);
});

router.post("/createfeedback", async (req, res) => {
  const feed = new FeedbackModel(req.body);
  const feedAdded = await feed.save();
  res.status(200).json(feedAdded);
});

//read all feedbacks
router.get("/getallfeedbacks",async (req,res)=>{
  let feed = await FeedbackModel.find({});
  res.send(feed);
});
//read feedback by syudent id
router.get("/getallfeedbacksbystudentid/:id",async (req,res)=>{
  let allfeed = await FeedbackModel.find({});
  let feed= allfeed.filter(index=>{
    return index.userSchema === req.params.id
  });
  res.send(feed);
});
//read feedback by algorithm id
router.get("/getallfeedbacksbyalgorithmid/:id",async (req,res)=>{
  let allfeed = await FeedbackModel.find({});
  let feed= allfeed.filter(index=>{
    return index.algorithm === req.params.id
  });
  res.send(feed);
});
// router.post("/createquiz", async (req, res) => {
//   const quiz = new Quiz({
//     question: [
//       {
//         text: req.body.text,
//         choices: req.body.choices,
//         anxIdx: req.body.anxIdx,
//         why: req.body.why,
//       },
//     ],
//   });
//   const quizAdded = await quiz.save();
//   res.status(200).json(quizAdded);
// });

module.exports = router;
