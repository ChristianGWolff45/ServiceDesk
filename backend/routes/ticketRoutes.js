const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  updateTicketStatus,
  updateTicketPriority,
  assignTicket,
  deleteTicket,
  getMyTickets,
} = require("../controller/ticketController");

const { validateToken } = require("../middleware/authValidation");
const ticketValidation = require("../middleware/ticketValidation");
const { userBodyValidation } = require("../middleware/userValidation");

router.get("/", getAllTickets);
router.get("/me", validateToken, getMyTickets);
router.get("/:ticketId", ticketValidation, getTicketById);
router.post("/", userBodyValidation("requesterId"), createTicket);
router.patch("/:ticketId", ticketValidation, updateTicket);
router.patch("/:ticketId/priority", ticketValidation, updateTicketPriority);
router.patch("/:ticketId/status", ticketValidation, updateTicketStatus);
router.patch(
  "/:ticketId/assignee",
  ticketValidation,
  userBodyValidation("assigneeId"),
  assignTicket,
);

router.delete("/:ticketId", ticketValidation, deleteTicket);

module.exports = router;
