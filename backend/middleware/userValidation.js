const users = require("../data/users");

function userValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.userId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}

module.exports = userValidation;
