let comments = require("../data/comments");

function getCommentsByTicketId(req, res) {
  let ticketComments = comments.filter(
    (comment) => comment.ticketId === req.params.ticketId,
  );
  res.json(ticketComments);
}

function getCommentById(req, res) {
  console.log("comment id ", req.params.commentId);
  res.json(
    comments.find((comment) => {
      comment.id === req.params.commentId;
    }),
  );
}

function createComment(req, res) {
  const newTicket = {
    id: "cmnt-" + crypto.randomUUID(),
    ticketId: req.params.ticketId,
    authorId: req.body.authorId,
    body: req.body.body,
    isInteral: req.body.isInteral,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  res.json(newTicket);
}

function updateComment(req, res) {
  const comment = comments.find(
    (comment) => comment.id === req.params.commentId,
  );
  comment.body = req.body.body;
  comment.updatedAt = new Date().toISOString();
  res.json(comment);
}

function deleteComment(req, res) {
  comments = comments.filter((comment) => comment.id !== comment);
  res.json({ message: "comment succefully deleted" });
}

module.exports = {
  getCommentsByTicketId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
