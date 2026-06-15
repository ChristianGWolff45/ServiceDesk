const comments = require("../data/comments");

function commentValidation(req, res, next) {
  const found = comments.some((comment) => comment.id === req.commentId);
  if (!found) {
    return res.status(404).json({ message: "comment not found" });
  }
  next();
}

module.exports = commentValidation;
