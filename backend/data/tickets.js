const tickets = [
  {
    id: "t1",
    title: "Need GitHub access",
    description: "I need access to the organization GitHub repository.",
    status: "OPEN",
    priority: "MEDIUM",
    category: "Account Access",
    requesterId: "u1",
    assigneeId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Website navbar broken",
    description: "The navbar overlaps content on mobile screens.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Website Bug",
    requesterId: "u2",
    assigneeId: "u3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

module.exports = tickets;
