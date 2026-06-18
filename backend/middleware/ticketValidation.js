const pool = require("../db");

async function TicketValidation(req, res, next) {
  const ticketId = Number(req.params.ticketId);
  if (!Number.isInteger(ticketId) || ticketId < 1) {
    return res
      .status(400)
      .json({ message: "ticketId must be a positive integer" });
  }
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM tickets
      WHERE id = $1
    `,
      [ticketId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "could not locate ticket" });
    }
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "could not locate ticket" });
  }

  next();
}

module.exports = TicketValidation;
