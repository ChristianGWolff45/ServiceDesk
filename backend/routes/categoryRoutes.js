const express = require("express");
const router = express.Router({ mergeParams: true });
const { getCategories } = require("../controller/categoryController");

router.get("/", getCategories);

module.exports = router;
