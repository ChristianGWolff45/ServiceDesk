const users = require("../data/users");

function getAllUsers(req, res) {
  res.json(users);
}

function getUserById(req, res) {
  res.json(users.find(users.id === req.params.userId));
}

function createUser(req, res) {
  if (
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.phoneNumber === undefined ||
    req.body.email === undefined ||
    req.body.role === undefined ||
    req.body.department === undefined
  ) {
    return res.status(400).json({
      message:
        "firstname, lastname, phonenumber, email, role, or department is missing",
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
}

function updateUser(req, res) {
  const user = users.find((user) => user.id === req.params.userId);
  const keys = ["firstName", "lastName", "email", "phone number", "department"];
  for (const key of keys) {
    if (req.body[key] !== undefined) {
      user[key] = req.body[key];
    }
  }

  res.json(user);
}

function updateUserRole(req, res) {
  const user = users.find((user) => user.id === req.params.userId);
  user.role = req.body.role;
  res.json(user);
}

function deleteUser(req, res) {
  users = users.filter((user) => user.id !== req.params.id);
  res.json({ message: "user succefully deleted" });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
};

// getCommentsByTicketId
// getCommentById
// createComment
// updateComment
// deleteComment
