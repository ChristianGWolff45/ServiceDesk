const tickets = require("../data/tickets");

function TicketValidation(req, res, next) {
  const ticketFound = tickets.some((ticket) => {
    return ticket.id === req.params.ticketId;
  });

  if (!ticketFound) {
    return res.status(404).json({ message: "ticket not found" });
  }

  next();
}

module.exports = TicketValidation;
