const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  login,
  getMe,
  resetPassword,
  adminResetPassword,
} = require("../controller/registerController");

const { validateToken } = require("../middleware/authValidation");

router.post("/registerNewUser", registerNewUser);

router.post("/login", login);

router.get("/me", validateToken, getMe);

router.patch("/resetPassword", resetPassword);

router.patch("/adminResetPassword", validateToken, adminResetPassword);

module.exports = router;
