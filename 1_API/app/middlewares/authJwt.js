const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

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

function checkRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    });
  };
}
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