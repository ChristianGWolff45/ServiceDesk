// id: "c1",
// ticketId: "t1",
// authorId: "u1",
// body: "This doesn't make any sense. Does anyone know the solution?",
// isInternal: true,
// createdAt: new Date().toISOString(),
// updatedAt: new Date().toISOString(),

const express = require("express");
const router = express.Router({ mergeParams: true });
const TicketValidation = require("../middleware/ticketValidation");
const commentValidation = require("../middleware/commentValidation");
const { userTokenValidation } = require("../middleware/userValidation");
const {
  getCommentsByTicketId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

const {
  validateToken,
  authorizeTicketAccess,
} = require("../middleware/authValidation");

router.get(
  "/",
  validateToken,
  TicketValidation,
  authorizeTicketAccess,
  getCommentsByTicketId,
);

router.get("/:commentId", validateToken, commentValidation, getCommentById);

router.post(
  "/",
  validateToken,
  TicketValidation,
  userTokenValidation,
  createComment,
);

router.patch("/:commentId", validateToken, commentValidation, updateComment);

module.exports = router;
