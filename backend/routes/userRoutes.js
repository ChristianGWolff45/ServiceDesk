const express = require("express");
const router = express.Router();
const crypto = require("crypto");

let users = require("../data/users.js");
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

router.post("/", (req, res) => {
  if (
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.email === undefined ||
    req.body.role === undefined ||
    req.body.department === undefined
  ) {
    return res.status(400).json({
      message: "firstname, lastname, email, role, or department is missing",
    });
  }
  const user = {
    id: "USER-" + crypto.randomUUID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    department: req.body.department,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  res.json({ message: "user created succefully" });
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

router.delete("/:id", (req, res) => {
  const exists = users.some((user) => user.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "user does not exist" });
  }
  users = users.filter((user) => user.id !== req.params.id);
  res.json({ message: "succefully deleted user" });
});

module.exports = router;
