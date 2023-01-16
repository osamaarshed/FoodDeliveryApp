const jwt = require("jsonwebtoken");
// const Model = require("./../Models/UserModel");
const secret = "thisistheseckretkey";

const auth = (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.send(err);
      }
      req.user = user;
      next();
    });
  } else {
    res.send("Unauthorized 2");
  }
};

module.exports = auth;
