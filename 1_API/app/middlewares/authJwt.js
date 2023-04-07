const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    //const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Moderator Role!" });
    return;
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
// isUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId).exec();
//     const roles = await Role.find({ _id: { $in: user.roles } }).exec();

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "user") {
//         next();
//         return;
//       }
//     }

//     res.status(403).send({ message: "Require Role!" });
//     return;
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// };

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  // isUser,
};
module.exports = authJwt;