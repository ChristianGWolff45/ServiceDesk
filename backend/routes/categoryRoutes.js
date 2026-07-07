const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controller/categoryController");

const { validateToken } = require("../middleware/authValidation");

router.get("/", getCategories);

router.patch("/:categoryId", validateToken, updateCategory);

router.post("/", validateToken, createCategory);

router.delete("/:categoryId", validateToken, deleteCategory);
module.exports = router;
