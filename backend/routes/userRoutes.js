const express = require("express");
const router = express.Router({ mergeParams: true });
const crypto = require("crypto");
const {
  userBodyValidation,
  userParamValidation,
} = require("../middleware/userValidation.js");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deactivateUser,
  activateUser,
  getUserByEmail,
  getSupportStaff,
} = require("../controller/userController");

const { validateToken } = require("../middleware/authValidation.js");

router.get("/", validateToken, getAllUsers);

router.get("/staff", validateToken, getSupportStaff);

router.get("/:userId", validateToken, userParamValidation, getUserById);

router.get("/byEmail/:email", validateToken, getUserByEmail);

router.post("/", validateToken, createUser);

router.patch("/:userId", validateToken, userParamValidation, updateUser);

router.patch(
  "/:userId/userRole",
  validateToken,
  userParamValidation,
  updateUserRole,
);

router.patch(
  "/:userId/deactivate",
  validateToken,
  userParamValidation,
  deactivateUser,
);

router.patch(
  "/:userId/activate",
  validateToken,
  userParamValidation,
  activateUser,
);

module.exports = router;
