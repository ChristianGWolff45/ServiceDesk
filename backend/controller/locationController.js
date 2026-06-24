const pool = require("../db");

async function getAllLocations(req, res) {
  try {
    const result = await pool.query(`
            SELECT *
            FROM locations
        `);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not get locations" });
  }
}

module.exports = { getAllLocations };
