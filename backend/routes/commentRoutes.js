// id: "c1",
// ticketId: "t1",
// authorId: "u1",
// body: "This doesn't make any sense. Does anyone know the solution?",
// isInternal: true,
// createdAt: new Date().toISOString(),
// updatedAt: new Date().toISOString(),

const express = require("express");
const router = express.Router({ mergeParams: true });
const comments = require("../data/comments");
const tickets = require("../data/tickets");
const TicketValidation = require("../middleware/ticketValidation");
const commentValidation = require("../middleware/commentValidation");
const { userBodyValidation } = require("../middleware/userValidation");
const {
  getCommentsByTicketId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

router.get("/", TicketValidation, getCommentsByTicketId);

router.get("/:commentId", commentValidation, getCommentById);

router.post(
  "/",
  TicketValidation,
  userBodyValidation("AuthorId"),
  createComment,
);

router.patch("/:commentId", commentValidation, updateComment);

router.delete("/:commentId", commentValidation, deleteComment);

module.exports = router;
