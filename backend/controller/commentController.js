const pool = require("../db");

async function getCommentsByTicketId(req, res) {
  const ticketId = req.params.ticketId;
  try {
    const results = await pool.query(
      `
    SELECT *
    FROM comments
    WHERE ticket_id = $1    
    `,
      [ticketId],
    );
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get comments" });
  }
}

async function getCommentById(req, res) {
  const commentId = req.params.commentId;
  try {
    const results = await pool.query(
      `
      SELECT * FROM comments WHERE id = $1
    `,
      [commentId],
    );
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get comment" });
  }
}

async function createComment(req, res) {
  const { authorId, body, isInternal } = req.body;
  const ticketId = req.params.ticketId;
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
  try {
    const result = await pool.query(
      `
        UPDATE comments
        SET
          body = COALESCE($1, body)
          updatedAt = $2
        WHERE
          id = $3
      `,
      [req.body.body, updatedAt, commentId],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update comment" });
  }
  res.json(comment);
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
