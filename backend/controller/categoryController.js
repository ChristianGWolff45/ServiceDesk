const pool = require("../db");

async function getCategories(req, res) {
  try {
    const result = await pool.query(`
        SELECT *
        FROM categories
        `);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get categories" });
  }
}

module.exports = { getCategories };
