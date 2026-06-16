const { Construction } = require("lucide-react");
let tickets = require("../data/tickets");

function getAllTickets(req, res) {
  res.json(tickets);
}

function getTicketById(req, res) {
  res.json(
    tickets.find((ticket) => {
      return ticket.id === req.params.ticketId;
    }),
  );
}

function createTicket(req, res) {
  const { title, description, category, requesterId } = req.body;

  if (!title || !description || !category || !requesterId) {
    return res.status(400).json({
      message: "title, description, category, or requesterId is missing",
    });
  }

  const newTicket = {
    id: "TCK-" + crypto.randomUUID(),
    title,
    description,
    status: "OPEN",
    priority: "LOW",
    category,
    requesterId,
    assigneeId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
}

function updateTicket(req, res) {
  const ticket = tickets.find((ticket) => (ticket.id = req.params.ticketId));
  const keys = ["title", "description", "category"];
  for (const key of keys) {
    if (req.body[key] !== undefined) {
      ticket[key] = req.body[key];
    }
  }
  ticket.updatedAt = new Date().toISOString();
  res.json(ticket);
}

function updateTicketStatus(req, res) {
  const ticket = tickets.find((ticket) => ticket.id === req.params.ticketId);
  ticket.status = req.body.status;
  res.status(200).json({ message: "ticket updated succefully" });
}

function updateTicketPriority(req, res) {
  const ticket = tickets.find((ticket) => ticket.id === req.params.ticketId);
  ticket.status = req.body.priority;
  res.status(200).json({ message: "ticket updated succefully" });
}

function assignTicket(req, res) {
  const ticket = tickets.find((ticket) => ticket.id === req.params.ticketId);
  ticket.assigneeId = req.body.assigneeId;
  res.status(200).json({ message: "ticket updated succefully" });
}

function deleteTicket(req, res) {
  tickets = tickets.filter((ticket) => ticket.id !== req.params.ticketId);
  res.status(204).json({ message: "ticket deleted succefully" });
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  updateTicketStatus,
  updateTicketPriority,
  assignTicket,
  deleteTicket,
};
