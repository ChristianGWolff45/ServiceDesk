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

async function updateLocation(req, res) {
  const id = Number(req.params.locationId);
  const location = req.body.location;
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "user does not have permission" });
  }
  if (!Number.isInteger(id) || id < 0) {
    return res.status(400).json({ message: " not a valid id" });
  }
  try {
    const result = await pool.query(
      `
            UPDATE locations
            SET location=$1
            WHERE id = $2
            RETURNING *
        `,
      [location, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update location" });
  }
}

async function deleteLocation(req, res) {
  const id = Number(req.params.locationId);
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "user does not have permission" });
  }
  if (!Number.isInteger(id) || id < 0) {
    return res.status(400).json({ message: " not a valid id" });
  }
  try {
    const result = pool.query(
      `
        DELETE FROM locations
        WHERE id = $1
    `,
      [id],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete location" });
  }
}

async function createLocation(req, res) {
  const location = req.body.location;
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "user does not have permission" });
  }
  try {
    const result = await pool.query(
      `
        INSERT INTO locations(location)
        VALUES($1)
        RETURNING*
    `,
      [location],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to post location" });
  }
}

module.exports = {
  getAllLocations,
  deleteLocation,
  updateLocation,
  createLocation,
};
