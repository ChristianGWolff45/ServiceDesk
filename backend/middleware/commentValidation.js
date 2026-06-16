const comments = require("../data/comments");

function commentValidation(req, res, next) {
  console.log(req.params.commentId);
  const found = comments.some((comment) => comment.id === req.params.commentId);
  if (!found) {
    return res.status(404).json({ message: "comment not found" });
  }
  next();
}

module.exports = commentValidation;
