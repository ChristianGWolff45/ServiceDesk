const pool = require("../db");

async function getAllTickets(req, res) {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not retrieve tickets" });
  }
}

async function getTicketById(req, res) {
  try {
    const ticket = await pool.query("SELECT * FROM tickets WHERE id = $1", [
      req.params.ticketId,
    ]);
    if (ticket.rows.length === 0) {
      return res.status(404).json;
    }
    res.json(ticket.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not find ticket" });
  }
}

async function createTicket(req, res) {
  const { title, description, location, category, requesterId } = req.body;
  if (!title || !description || !category || !requesterId || !location) {
    return res.status(400).json({
      message:
        "title, description, category, location, or requesterId is missing",
    });
  }

  try {
    const result = await pool.query(
      `
    INSERT INTO 
    tickets(title, description, category, requester_id, location)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [title, description, category, requesterId, location],
    );

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not create ticket" });
  }
}

async function updateTicket(req, res) {
  const ticketId = req.params.ticketId;
  const { title, description, category } = req.body;
  const updateTime = new Date().toISOString();
  try {
    const result = await pool.query(
      `
      UPDATE tickets
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category = COALESCE($3, category),
        updated_at = $4
      WHERE id = $5
      RETURNING *
      `,
      [title, description, category, updateTime, ticketId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update ticket" });
  }
}

async function updateTicketStatus(req, res) {
  const ticketId = req.params.ticketId;
  const status = req.body.status;
  const updateTime = new Date().toISOString();
  try {
    const result = await pool.query(
      `
      UPDATE tickets
      SET
        status = COALESCE($1, status)
        updated_at = $2
      WHERE
        id = $3
      RETURNING *
      `,
      [status, updateTime, ticketId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update ticket status" });
  }
}

async function updateTicketPriority(req, res) {
  const ticketId = req.params.ticketId;
  const priority = req.body.priority;

  try {
    const result = await pool.query(
      `
      UPDATE tickets
      SET
        priority = COALESCE($1, priority)
      WHERE
        id = $2
      RETURNING *
      `,
      [priority, ticketId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update ticket status" });
  }
}

async function assignTicket(req, res) {
  const assignee = req.body.assigneeId;
  const ticketId = req.params.ticketId;

  try {
    const result = await pool.query(
      `
      UPDATE tickets
      SET
        assignee_id = COALESCE($1, assignee_id)
      WHERE
        id = $2
      RETURNING *
      `,
      [assignee, ticketId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not assign ticket" });
  }
}

async function deleteTicket(req, res) {
  const ticketId = req.params.ticketId;

  try {
    const result = await pool.query(
      `
      UPDATE tickets
      SET
        is_active = false
      WHERE
        id = $1
      RETURNING *
      `,
      [ticketId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not delete ticket" });
  }
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
