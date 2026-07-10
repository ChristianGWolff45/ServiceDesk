const pool = require("../db");

async function commentValidation(req, res, next) {
  const commentId = Number(req.params.commentId);
  if (!Number.isInteger(commentId) || commentId < 1) {
    return res
      .status(400)
      .json({ message: "ticketId must be a positive integer" });
  }
  try {
    const response = await pool.query(
      `
        SELECT *
        FROM comments
        WHERE id = $1
      `,
      [commentId],
    );
    if (response.rows.length === 0) {
      res.status(404).json({ message: "could not find comment" });
    }
    req.comment = response.rows[0];
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error could not validate comment" });
  }

  next();
}

module.exports = commentValidation;
