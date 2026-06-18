const pool = require("../db");

async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get users" });
  }
}

async function getUserById(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "failed to find account" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to find user" });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, email, phoneNumber, department, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !department ||
    !role
  ) {
    return res.status(400).json({
      message:
        "missing firstName, lastName, email, phoneNumber, department, or role",
    });
  }
  try {
    const result = await pool.query(
      `
      INSERT INTO users(
        first_name,
        last_name,
        email,
        phone_number,
        role,
        department
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *  
      `,
      [firstName, lastName, email, phoneNumber || null, role, department],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to create user" });
  }
}

async function updateUser(req, res) {
  const { firstName, lastName, email, phoneNumber, department } = req.body;
  const id = req.params.userId;
  try {
    const result = await pool.query(
      `
      UPDATE users
      SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        phone_number = COALESCE($4, phone_number),
        department = COALESCE($5, department)
      WHERE id = $6
      RETURNING *
      `,
      [firstName, lastName, email, phoneNumber, department, id],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "faled to update user" });
  }
}

function updateUserRole(req, res) {
  const id = req.params.userId;
  const role = req.body.role;
  try {
    const result = pool.query(
      `
      UPDATE users
      SET
        role = COALESCE($1, role)
      WHERE
        id = $2
      `,
      [role, id],
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update user role" });
  }
}

function deleteUser(req, res) {
  const id = req.params.userId;
  try {
    const result = pool.query(
      `
      UPDATE users
      SET is_active = false
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not delete user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
};
