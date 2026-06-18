const pool = require("../db");

async function commentValidation(req, res, next) {
  const commentId = Number(req.params.commentId);
  if (!Number.isInteger(commentId) || commentId < 1) {
    return res.status(400).json({ message: "please enter a valid comment id" });
  }
  try {
    const results = await pool.query("SELECT * FROM comments WHERE id = $1", [
      commentId,
    ]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "could not find comment" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not validate comment" });
  }
  next();
}

module.exports = commentValidation;
