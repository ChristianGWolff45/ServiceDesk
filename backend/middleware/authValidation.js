const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(400).json({ message: "could not find token" });
  }
  try {
    const token = authToken.split(" ")[1];
    console.log("token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

module.exports = { validateToken };
