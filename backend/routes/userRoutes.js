const express = require("express");
const router = express.Router();

const users = require("../data/users.js");
router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "could not find user" });
  }
  res.json(user);
});

router.put("/", (req, res) => {
  if (
    req.firstName === undefined ||
    req.lastName === undefined ||
    req.email === undefined ||
    req.role === undefined ||
    req.department === undefined
  ) {
    return res
      .status(400)
      .json({
        message: "firstname, lastname, email, role, or department is missing",
      });
  }
});

router.patch("/:id", (req, res) => {
  const user = users.find((user) => {
    return user.id == req.params.id;
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const keys = ["firstName", "lastName", "email", "role", "department"];
  for (const key of keys) {
    if (req.body[key] !== undefined) {
      user[key] = req.body[key];
    }
  }

  res.json(user);
});

module.exports = router;
