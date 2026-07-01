const pool = require("../db");

async function userParamValidation(req, res, next) {
  const id = Number(req.params.userId);
  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .json({ message: "userId must be a positive integer" });
  }
  try {
    const user = await pool.query(
      `
        SELECT *
        FROM users
        WHERE id = $1
      `,
      [id],
    );
    if (user.rows.length == 0) {
      return res.status(404).json({ message: "could not find user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "user could not be validated" });
  }
  next();
}

function userBodyValidation(name) {
  return async function (req, res, next) {
    const id = Number(req.body[name]);
    if (!Number.isInteger(id) || id <= 0) {
      return res
        .status(400)
        .json({ message: "userId must be a positive integer" });
    }
    try {
      const user = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
      `,
        [id],
      );
      if (user.rows.length == 0) {
        return res.status(404).json({ message: "could not find user" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "user could not be validated" });
    }
    next();
  };
}

async function userTokenValidation(req, res, next) {
  const id = req.user.id;
  try {
    const user = await pool.query(
      `
        SELECT *
        FROM users
        WHERE id = $1
      `,
      [id],
    );
    if (user.rows.length == 0) {
      return res.status(404).json({ message: "could not find user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "user could not be validated" });
  }
  next();
}

module.exports = {
  userBodyValidation,
  userParamValidation,
  userTokenValidation,
};
