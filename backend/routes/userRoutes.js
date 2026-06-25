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
} = require("../controller/userController");

router.get("/", getAllUsers);

router.get("/:userId", userParamValidation, getUserById);

router.get("/byEmail/:email", getUserByEmail);

router.post("/", createUser);

router.patch("/:userId", userParamValidation, updateUser);

router.patch("/:userId/userRole", userParamValidation, updateUserRole);

router.patch("/:userId/deactivate", userParamValidation, deactivateUser);

router.patch("/:userId/activate", userParamValidation, activateUser);
module.exports = router;
