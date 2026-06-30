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
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  console.log("values:", firstName, lastName, email, phoneNumber, password);
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
            users(first_name, last_name, email, phone_number, role, hash_password)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING*
        `,
      [firstName, lastName, email, phoneNumber, "REQUESTER", passwordHash],
    );
    const user = response.rows[0];
    const token = createToken(user);

    res.json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not register new user" });
  }
}

async function registerExistingUser(req, res) {
  try {
    const id = req.params.userId;
    const password = req.body.password;
    const passwordHash = await bcrypt.hash(password);
    const response = await pool.query(
      `UPDATE users
        SET hash_password=$1
        WHERE id =$2
        RETURNING*
        `,
      [passwordHash, id],
    );
    const token = createToken(user);
    const user = response.row[0];
    res.json({
      token,
      user: {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not register user" });
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

    const user = result.rows[0];

    const successfullLogin = await bcrypt.compare(password, user.hash_password);
    console.log(successfullLogin);
    if (!successfullLogin) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }

    const token = createToken(user);

    return res
      .status(200)
      .json({
        user: {
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
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

module.exports = {
  registerExistingUser,
  registerNewUser,
  createToken,
  login,
  getMe,
};
