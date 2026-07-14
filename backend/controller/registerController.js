const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
}

async function registerNewUser(req, res) {
  const { firstName, lastName, email, phoneNumber, password, passwordReset } =
    req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({
      message: "missing firstname, lastname, password, email or phone number",
    });
  }

  try {
    const result = await pool.query(`SELECT * FROM users where email = $1`, [
      email,
    ]);
    if (result.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "user already exists login instead" });
    }
  } catch (error) {
    res.status(500).json({ message: "could not confirm unique email" });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await pool.query(
      `
            INSERT INTO 
            users(first_name, last_name, email, phone_number, role, hash_password, password_reset)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING*
        `,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        "REQUESTER",
        passwordHash,
        passwordReset ?? false,
      ],
    );
    const user = response.rows[0];
    const token = createToken(user);

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      role: user.role,
    };
    res.status(201).json({ token, user: safeUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not register new user" });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: "missing password or email" });
  }
  try {
    const result = await pool.query(
      `
          SELECT *
          FROM users
          WHERE email = $1
      `,
      [email],
    );
    if (result.rows.length < 1) {
      return res.status(404).json({ message: "could not find user" });
    }
    if (result.rows[0].is_active === false) {
      return res
        .status(400)
        .json({
          message:
            "account is disabled please contact administrater to activate you",
        });
    }

    const user = result.rows[0];
    if (user.hash_password === "[null]") {
      return res.status(403).json({ message: "user must reset password" });
    }
    const successfullLogin = await bcrypt.compare(password, user.hash_password);
    if (!successfullLogin) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
    if (user.password_reset) {
      return res.status(403).json({ message: "user must reset password" });
    }

    const token = createToken(user);
    const safeUser = {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      role: user.role,
      id: user.id,
    };
    return res.status(200).json({
      user: safeUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "cant login user" });
  }
}

async function getMe(req, res) {
  res.status(200).json({
    user: { id: req.user.id, email: req.user.email, role: req.user.role },
  });
}

async function resetPassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({
      message: `missing ${!email ? "email" : ""} ${!oldPassword ? "old password" : ""} ${!newPassword ? "newPassword" : ""}`,
    });
  }

  try {
    const result = await pool.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email],
    );
    if (result.rows.length < 1) {
      return res.status(404).json({ message: "could not find user" });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(oldPassword, user.hash_password);
    if (!match && user.hash_password !== "[null]") {
      return res
        .status(401)
        .json({ message: "user or old password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const passwordSwitch = await pool.query(
      `
          UPDATE users
          SET hash_password = $1,
              password_reset = $2
          WHERE email = $3
          RETURNING *
        `,
      [hashedPassword, false, email],
    );
    if (passwordSwitch.rows.length < 1) {
      res.status(404).json({ message: "could not switch users password" });
    }
    const token = createToken(user);
    const safeUser = {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      id: user.id,
    };

    res.json({ user: safeUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update password" });
  }
}

async function adminResetPassword(req, res) {
  const { password, userId } = req.body;
  if (!password || !userId) {
    return res.status(400).json({ message: "missing password or userId" });
  }
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "user does not have permission to reset password" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await pool.query(
      `
        SELECT *
        FROM user
        WHERE id = $1
      `,
      [userId],
    );
    if (response.rows.length < 1) {
      return res.status(404).json({ message: "could not find user" });
    }
    const result = await pool.query(
      `
      UPDATE users
      SET
        hash_password = $1,
        password_reset = $2
      WHERE id = $3
      `,
      [hashedPassword, true, userId],
    );
    res.status(200).json({ message: "succefully changed password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

module.exports = {
  resetPassword,
  registerNewUser,
  createToken,
  login,
  getMe,
  adminResetPassword,
};
