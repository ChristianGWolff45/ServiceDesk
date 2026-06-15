const express = require("express");
const router = express.Router({ mergeParams: true });
const crypto = require("crypto");
const userValidation = require("../middleware/userValidation.js");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");

let users = require("../data/users.js");
router.get("/", getAllUsers);

router.get("/:userId", userValidation, getUserById);

router.post("/", createUser);

router.patch("/:userId", userValidation, updateUser);

router.patch("/:userId/userRole", userValidation, updateUserRole);

router.delete("/:userId", userValidation, deleteUser);

module.exports = router;
