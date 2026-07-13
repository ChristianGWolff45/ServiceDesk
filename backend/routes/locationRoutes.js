const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  deleteLocation,
  updateLocation,
  createLocation,
} = require("../controller/locationController");

const { validateToken } = require("../middleware/authValidation");

router.get("/", validateToken, getAllLocations);

router.patch("/:locationId", validateToken, updateLocation);

router.delete("/:locationId", validateToken, deleteLocation);

router.post("/", validateToken, createLocation);

module.exports = router;
