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
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res
        .status(500)
        .json({ message: "missing firstname, lastname email or phone number" });
    }

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

    res.json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not register new user" });
  }
}

// async function registerExistingUser(req, res) {
//   try {
//     const id = req.params.userId;
//     const password = req.body.password;
//     const passwordHash = await bcrypt.hash(password);
//     const response = await pool.query(
//       `UPDATE users
//         SET hash_password=$1
//         WHERE id =$2
//         RETURNING*
//         `,
//       [passwordHash, id],
//     );
//     const token = createToken(user);
//     const user = response.row[0];
//     res.json({
//       token,
//       user: {
//         email: user.email,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "could not register user" });
//   }
// }

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

    const user = result.rows[0];
    if (user.hash_password === "[null]") {
      return res.status(403).json({ message: "user must reset password" });
    }
    const successfullLogin = await bcrypt.compare(password, user.hash_password);
    if (!successfullLogin) {
      console.log(user.hash_password);
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
    if (user.password_reset) {
      return res.status(403).json({ message: "user must reset password" });
    }

    const token = createToken(user);
    return res.status(200).json({
      user: {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        id: user.id,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "cant login user" });
  }
}

async function getMe(req, res) {
  res.json({
    user: { id: req.user.id, email: req.user.email, role: req.user.role },
  });
}

async function resetPassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;

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
      return res.status(400).json({ message: "user not found" });
    }
    const user = result.rows[0];
    const match = bcrypt.compare(oldPassword, user.hash_password);
    if (!match && user.hash_password !== "[null]") {
      return res
        .status(404)
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
      res.status(404).json({ message: "could not find user" });
    }
    const token = createToken(user);
    const safeUser = {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    };

    res.json({ user: safeUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not update password" });
  }
}

module.exports = {
  resetPassword,
  registerNewUser,
  createToken,
  login,
  getMe,
};
