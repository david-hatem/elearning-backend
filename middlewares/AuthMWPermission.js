const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, nxt) => {
  //check user role(Instructor or Student)
  const token = req.header("x-auth");
  if (!token) {
    return res.status(401).send("Access Denied...");
  }
  try {
    const decodedPayload = jwt.verify(token, config.get("jwtsec"));
    if (!decodedPayload.isIns) {
      return res.status(401).send("Access Denied..");
      nxt();
    }
  } catch (err) {
    res.status(400).send("Invalid Token...");
  }
};
