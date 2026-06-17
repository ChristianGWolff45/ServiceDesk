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
  deleteUser,
} = require("../controller/userController");

router.get("/", getAllUsers);

router.get("/:userId", userParamValidation, getUserById);

router.post("/", createUser);

router.patch("/:userId", userParamValidation, updateUser);

router.patch("/:userId/userRole", userParamValidation, updateUserRole);

router.delete("/:userId", userParamValidation, deleteUser);

module.exports = router;
