const jwt = require("jsonwebtoken");
const { pool } = require("../db");

async function validateToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ message: "could not find token" });
  }
  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "invalid token" });
  }
}

function authorizeTicketAccess(req, res, next) {
  const user = req.user;
  const ticket = req.ticket;
  if (
    user.role === "ADMIN" ||
    user.role === "AGENT" ||
    ticket.requester_id === user.id
  ) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "user not authorized to view ticket" });
  }
}

module.exports = { validateToken, authorizeTicketAccess };
