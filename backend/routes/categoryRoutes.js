const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controller/categoryController");

router.get("/", getCategories);

router.patch("/:categoryId", updateCategory);

router.post("/", createCategory);

router.delete("/:categoryId", deleteCategory);
module.exports = router;
