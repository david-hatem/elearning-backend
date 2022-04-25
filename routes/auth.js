const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const validator = require("../middlewares/AuthMWValidator");
const config = require("config");

//LOGIN
router.post("/login", validator, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).send("Invalid email or password...");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).send("Invalid email or password...");
    }
    if (!config.get("jwtsec")) {
      return res.status(500).send("Token is not defined....");
    }
    const token = user.genAuthToken();
    res.header("x-auth-token", token);
    res.status(200).send("logged-in successfully");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad...");
    }
  }
});

module.exports = router;
