const users = require("../data/users");

function userParamValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.params.userId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}

function userValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.body.userId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}

function requesterValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.body.requesterId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}

function authorValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.body.authorId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}

function assigneeValidation(req, res, next) {
  const userFound = users.some((user) => user.id === req.body.assigneeId);
  if (!userFound) {
    return res.status(404).json({ message: "user not found" });
  }
  next();
}
module.exports = {
  userValidation,
  assigneeValidation,
  authorValidation,
  requesterValidation,
  userParamValidation,
};
