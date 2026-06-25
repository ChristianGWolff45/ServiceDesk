const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  deleteLocation,
  updateLocation,
  createLocation,
} = require("../controller/locationController");

router.get("/", getAllLocations);

router.patch("/:locationId", updateLocation);

router.delete("/:locationId", deleteLocation);

router.post("/", createLocation);

module.exports = router;
