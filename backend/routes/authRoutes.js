const express = require("express");
const router = express.Router();
const {
  registerExistingUser,
  registerNewUser,
  login,
  getMe,
  //   getCurrentUser,
} = require("../controller/registerController");

const { validateToken } = require("../middleware/authValidation");

// const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/registerNewUser", registerNewUser);

router.post("/login", login);

router.get("/me", validateToken, getMe);

module.exports = router;
