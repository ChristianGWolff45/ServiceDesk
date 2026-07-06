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
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !role) {
    return res.status(400).json({
      message: "missing firstName, lastName, email, phoneNumber, or role",
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
        role
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *  
      `,
      [firstName, lastName, email, phoneNumber || null, role],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to create user" });
  }
}

async function updateUser(req, res) {
  const { firstName, lastName, email, phoneNumber, role } = req.body;
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
        role = COALESCE($5, role)
      WHERE id = $6
      RETURNING *
      `,
      [firstName, lastName, email, phoneNumber, role, id],
    );
    res.json(result.rows[0]);
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

async function deactivateUser(req, res) {
  const id = req.params.userId;
  try {
    const result = await pool.query(
      `
      UPDATE users
      SET is_active = false
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not delete user" });
  }
}

async function activateUser(req, res) {
  const id = req.params.userId;
  try {
    const result = await pool.query(
      `
      UPDATE users
      SET is_active = true
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not delete user" });
  }
}

async function getUserByEmail(req, res) {
  const email = req.params.email;
  try {
    const result = await pool.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "user does not exist" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "could not find user" });
  }
}

async function getSupportStaff(req, res) {
  try {
    const response = await pool.query(`
          SELECT *
          FROM users
          WHERE 
          role IN ('AGENT', 'ADMIN')
      `);
    console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    return res.status(500).json({ message: "could not get support staff" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deactivateUser,
  activateUser,
  getUserByEmail,
  getSupportStaff,
};
