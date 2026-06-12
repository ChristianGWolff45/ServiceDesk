const express = require("express");

const router = express.Router();

let tickets = require("../data/tickets");

router.get("/", (req, res) => {
  res.json(tickets);
});

router.get("/:id", (req, res) => {
  const ticket = tickets.find((ticket) => {
    return ticket.id === req.params.id;
  });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  res.json(ticket);
});

router.post("/", (req, res) => {
  const { title, description, priority, category, requesterId } = req.body;

  if (!title || !description || !priority || !category || !requesterId) {
    return res.status(400).json({
      message:
        "title, description, priority, category, or requesterId is missing",
    });
  }

  const newTicket = {
    id: "TCK-" + crypto.randomUUID(),
    title,
    description,
    status: "OPEN",
    priority,
    category,
    requesterId,
    assigneeId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});

router.patch("/:id", (req, res) => {
  const ticket = tickets.find((ticket) => ticket.id === req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "no ticket with this id found" });
  }
  const keys = [
    "title",
    "description",
    "status",
    "priority",
    "category",
    "assigneeId",
  ];
  for (const key of keys) {
    if (req.body[key] !== undefined) {
      ticket[key] = req.body[key];
    }
  }

  ticket.updatedAt = new Date().toISOString();

  res.json(ticket);
});

router.delete("/:id", (req, res) => {
  const exists = tickets.some((ticket) => ticketId === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "ticket not found" });
  }
  tickets = tickets.filter((ticket) => ticketId !== req.params.id);

  res.json({ message: "ticket deleted succefully" });
});

module.exports = router;
