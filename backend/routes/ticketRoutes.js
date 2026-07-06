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
  removeAssignee,
  deleteTicket,
  getMyTickets,
  assignTicketMe,
} = require("../controller/ticketController");

const { validateToken } = require("../middleware/authValidation");
const ticketValidation = require("../middleware/ticketValidation");
const { userBodyValidation } = require("../middleware/userValidation");

router.get("/", validateToken, getAllTickets);
router.get("/me", validateToken, getMyTickets);
router.get("/:ticketId", ticketValidation, getTicketById);
router.post("/", userBodyValidation("requesterId"), createTicket);
router.patch("/:ticketId", ticketValidation, updateTicket);
router.patch(
  "/:ticketId/priority",
  validateToken,
  ticketValidation,
  updateTicketPriority,
);
router.patch(
  "/:ticketId/status",
  validateToken,
  ticketValidation,
  updateTicketStatus,
);

router.patch(
  "/:ticketId/assignee",
  validateToken,
  ticketValidation,
  userBodyValidation("assigneeId"),
  assignTicket,
);

router.patch(
  "/:ticketId/assignMe",
  validateToken,
  ticketValidation,
  assignTicketMe,
);

router.patch(
  "/:ticketId/removeAssignee",
  validateToken,
  ticketValidation,
  removeAssignee,
);

router.delete("/:ticketId", ticketValidation, deleteTicket);

module.exports = router;
