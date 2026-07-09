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

const {
  validateToken,
  authorizeTicketAccess,
} = require("../middleware/authValidation");
const ticketValidation = require("../middleware/ticketValidation");
const {
  userBodyValidation,
  userTokenValidation,
  userAssigneeValidation,
} = require("../middleware/userValidation");

router.get("/", validateToken, getAllTickets);
router.get("/me", validateToken, getMyTickets);
router.get(
  "/:ticketId",
  ticketValidation,
  validateToken,
  authorizeTicketAccess,
  getTicketById,
);
router.post("/", validateToken, createTicket);
router.patch(
  "/:ticketId",
  validateToken,
  ticketValidation,
  authorizeTicketAccess,
  updateTicket,
);
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
  userAssigneeValidation,
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

module.exports = router;
