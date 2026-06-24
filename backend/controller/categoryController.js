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

async function updateCategory(req, res) {
  const id = Number(req.params.categoryId);
  const categoryName = req.body.categoryName;
  if (!Number.isInteger(id) || id < 0) {
    res.status(400).json({ message: "id is not a valid integer" });
  }

  try {
    const result = await pool.query(
      `
        UPDATE categories
        SET category = $1
        WHERE id = $2
        RETURNING *
        `,
      [categoryName, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get categories" });
  }
}

async function createCategory(req, res) {
  const categoryName = req.body.categoryName;
  try {
    const result = await pool.query(
      `
        INSERT into 
        categories(category)
        VALUES($1)
        RETURNING *
        `,
      [categoryName],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get categories" });
  }
}

async function deleteCategory(req, res) {
  const id = Number(req.params.categoryId);
  if (!Number.isInteger(id) || id < 0) {
    res.status(400).json({ message: "id is not a valid integer" });
  }

  try {
    const result = await pool.query(
      `
        DELETE FROM categories
        WHERE id = $1
        `,
      [id],
    );
    res.json("succefully deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not get categories" });
  }
}

module.exports = {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
};
