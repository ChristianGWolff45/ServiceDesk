const pool = require("../db");

async function getCommentsByTicketId(req, res) {
  const ticket = req.ticket;
  const user = req.user;
  let query = `SELECT *
    FROM comments
    WHERE ticket_id = $1 `;

  if (user.role !== "ADMIN" && user.role !== "AGENT") {
    query += `AND is_internal = false`;
  }
  try {
    const results = await pool.query(query, [ticket.id]);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get comments" });
  }
}

async function getCommentById(req, res) {
  if (
    req.comment.author_id === req.user.id ||
    req.user.role === "ADMIN" ||
    req.user.role === "AGENT"
  ) {
    res.status(200).json(req.comment);
  } else {
    return res
      .status(403)
      .json({ message: "user does not have access to this ticket" });
  }
}

async function createComment(req, res) {
  const { body, isInternal } = req.body;
  const ticketId = req.params.ticketId;
  const user = req.user;
  if (isInternal) {
    if (user.role !== "AGENT" && user.role !== "ADMIN") {
      return res.status(403).json({
        message: "user does not have permission to create an internal comment",
      });
    }
  }
  const authorId = user.id;
  if (!authorId || !body || body === "") {
    return res.status(400).json({ message: "no comment or user received" });
  }
  try {
    const results = await pool.query(
      `
      INSERT INTO 
      comments(ticket_id, author_id, body, is_internal)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [ticketId, authorId, body, isInternal],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not create comment" });
  }
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const updatedAt = new Date().toISOString();
  if (req.user.id !== req.comment.author_id) {
    return res
      .status(403)
      .json({ message: "user can not update edit users comment" });
  }
  if (!req.body.body || req.body.body === "") {
    return res.status(400).json({ message: "comment body is empty" });
  }
  try {
    const result = await pool.query(
      `
        UPDATE comments
        SET
          body = COALESCE($1, body)
          updatedAt = $2
        WHERE
          id = $3
        RETURNING *
      `,
      [req.body.body, updatedAt, commentId],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update comment" });
  }
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  try {
    const result = await pool.query(
      `
        DELETE FROM comments
        WHERE id = $1
      `,
      [commentId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not delete comment" });
  }
}

module.exports = {
  getCommentsByTicketId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
