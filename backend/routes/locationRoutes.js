const express = require("express");
const router = express.Router();
const { getAllLocations } = require("../controller/locationController");

router.get("/", getAllLocations);

module.exports = router;
