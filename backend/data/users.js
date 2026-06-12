const users = [
  {
    id: "u1",
    firstName: "Christian",
    lastName: "Wolff",
    email: "christian@example.com",
    role: "REQUESTER",
    department: "Computer Science",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u2",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    role: "AGENT",
    department: "IT Support",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u3",
    firstName: "Maya",
    lastName: "Patel",
    email: "maya.patel@example.com",
    role: "AGENT",
    department: "Networking",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u4",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@example.com",
    role: "ADMIN",
    department: "IT",
    createdAt: new Date().toISOString(),
  },
];

module.exports = users;
