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

async function userAssigneeValidation(req, res, next) {
  const assigneeId = Number(req.body.assigneeId);
  if (!Number.isInteger(assigneeId) || assigneeId < 1) {
    return res.status(400).json({ message: "assigneeId must be a valid id" });
  }
  try {
    const response = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      assigneeId,
    ]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "could not find user" });
    }
    if (
      response.rows[0].role !== "ADMIN" &&
      response.rows[0].role !== "AGENT"
    ) {
      return res.status(400).json({
        message: "user must be an ADMIN or AGENT to be assigned a ticket",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "could not validate assignee" });
  }
  next();
}

module.exports = {
  userBodyValidation,
  userParamValidation,
  userTokenValidation,
  userAssigneeValidation,
};
