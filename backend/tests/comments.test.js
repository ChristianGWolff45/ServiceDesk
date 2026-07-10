const app = require("../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const pool = require("../db");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

const users = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@example.com",
    phone_number: "803-555-0101",
    role: "ADMIN",
    created_at: "2026-07-01T09:00:00Z",
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@example.com",
    phone_number: "803-555-0102",
    role: "AGENT",
    created_at: "2026-07-01T09:05:00Z",
  },
  {
    id: 3,
    first_name: "Charlie",
    last_name: "Brown",
    email: "charlie@example.com",
    phone_number: "803-555-0103",
    role: "AGENT",
    created_at: "2026-07-01T09:10:00Z",
  },
  {
    id: 4,
    first_name: "Diana",
    last_name: "Wilson",
    email: "diana@example.com",
    phone_number: "803-555-0104",
    role: "REQUESTER",
    created_at: "2026-07-01T09:15:00Z",
  },
  {
    id: 5,
    first_name: "Ethan",
    last_name: "Davis",
    email: "ethan@example.com",
    phone_number: "803-555-0105",
    role: "REQUESTER",
    created_at: "2026-07-01T09:20:00Z",
  },
  {
    id: 6,
    first_name: "Fiona",
    last_name: "Miller",
    email: "fiona@example.com",
    phone_number: "803-555-0106",
    role: "REQUESTER",
    created_at: "2026-07-01T09:25:00Z",
  },
  {
    id: 7,
    first_name: "George",
    last_name: "Thomas",
    email: "george@example.com",
    phone_number: "803-555-0107",
    role: "REQUESTER",
    created_at: "2026-07-01T09:30:00Z",
  },
  {
    id: 8,
    first_name: "Hannah",
    last_name: "White",
    email: "hannah@example.com",
    phone_number: "803-555-0108",
    role: "REQUESTER",
    created_at: "2026-07-01T09:35:00Z",
  },
];

const tickets = [
  {
    id: 1,
    title: "Unable to access GitHub organization",
    description:
      "I accepted the invitation but I still cannot see any repositories.",
    status: "OPEN",
    priority: "HIGH",
    category: "Account Access",
    requester_id: 4,
    assignee_id: null,
    location: "Remote",
    created_at: "2026-07-02T10:00:00Z",
    updated_at: "2026-07-02T10:00:00Z",
  },
  {
    id: 2,
    title: "VS Code extensions disappeared",
    description:
      "All of my installed extensions disappeared after the latest update.",
    status: "IN_PROGRESS",
    priority: "LOW",
    category: "Software Help",
    requester_id: 5,
    assignee_id: 2,
    location: "Beatty",
    created_at: "2026-07-02T11:00:00Z",
    updated_at: "2026-07-03T08:30:00Z",
  },
  {
    id: 3,
    title: "WiFi disconnects every few minutes",
    description:
      "The engineering building WiFi disconnects every 5–10 minutes.",
    status: "WAITING_ON_USER",
    priority: "MEDIUM",
    category: "Network",
    requester_id: 6,
    assignee_id: 3,
    location: "College of Engineering",
    created_at: "2026-07-03T09:00:00Z",
    updated_at: "2026-07-04T14:00:00Z",
  },
  {
    id: 4,
    title: "Need Docker installed",
    description: "Docker Desktop is required for my class project.",
    status: "RESOLVED",
    priority: "LOW",
    category: "Software Help",
    requester_id: 7,
    assignee_id: 2,
    location: "Swearingen",
    created_at: "2026-07-03T13:00:00Z",
    updated_at: "2026-07-05T16:00:00Z",
  },
  {
    id: 5,
    title: "Website returns HTTP 500",
    description: "Production website returns a server error after deployment.",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    category: "Website",
    requester_id: 4,
    assignee_id: 3,
    location: "Remote",
    created_at: "2026-07-04T08:30:00Z",
    updated_at: "2026-07-05T09:45:00Z",
  },
  {
    id: 6,
    title: "Printer won't connect",
    description: "Unable to print to the department printer.",
    status: "CLOSED",
    priority: "LOW",
    category: "Hardware",
    requester_id: 5,
    assignee_id: 2,
    location: "Thomas Cooper Library",
    created_at: "2026-07-04T10:00:00Z",
    updated_at: "2026-07-06T11:30:00Z",
  },
  {
    id: 7,
    title: "Need PostgreSQL access",
    description: "Please grant me access to the shared PostgreSQL database.",
    status: "OPEN",
    priority: "MEDIUM",
    category: "Database",
    requester_id: 6,
    assignee_id: null,
    location: "Remote",
    created_at: "2026-07-05T09:00:00Z",
    updated_at: "2026-07-05T09:00:00Z",
  },
  {
    id: 8,
    title: "Laptop won't boot",
    description: "Power light turns on but the screen remains black.",
    status: "OPEN",
    priority: "HIGH",
    category: "Hardware",
    requester_id: 7,
    assignee_id: null,
    location: "Capstone",
    created_at: "2026-07-05T11:00:00Z",
    updated_at: "2026-07-05T11:00:00Z",
  },
  {
    id: 9,
    title: "Vercel deployment failing",
    description:
      "Deployment fails during npm install because of dependency conflicts.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Deployment",
    requester_id: 4,
    assignee_id: 2,
    location: "Remote",
    created_at: "2026-07-06T08:00:00Z",
    updated_at: "2026-07-06T12:00:00Z",
  },
  {
    id: 10,
    title: "Outlook not syncing",
    description: "Emails are not syncing on my desktop application.",
    status: "RESOLVED",
    priority: "MEDIUM",
    category: "Email",
    requester_id: 5,
    assignee_id: 3,
    location: "Russell House",
    created_at: "2026-07-06T09:15:00Z",
    updated_at: "2026-07-07T15:45:00Z",
  },
];

const comments = [
  {
    id: 1,
    body: "I accepted the invitation yesterday but still don't have access.",
    ticket_id: 1,
    author_id: 4,
    is_internal: false,
    created_at: "2026-07-02T10:15:00Z",
    updated_at: "2026-07-02T10:15:00Z",
  },
  {
    id: 2,
    body: "Can you try logging out of GitHub and signing back in?",
    ticket_id: 1,
    author_id: 2,
    is_internal: false,
    created_at: "2026-07-02T11:00:00Z",
    updated_at: "2026-07-02T11:00:00Z",
  },
  {
    id: 3,
    body: "That worked. Thanks!",
    ticket_id: 1,
    author_id: 4,
    is_internal: false,
    created_at: "2026-07-02T11:20:00Z",
    updated_at: "2026-07-02T11:20:00Z",
  },
  {
    id: 4,
    body: "The issue started immediately after the latest deployment.",
    ticket_id: 5,
    author_id: 4,
    is_internal: false,
    created_at: "2026-07-04T08:45:00Z",
    updated_at: "2026-07-04T08:45:00Z",
  },
  {
    id: 5,
    body: "Investigating production environment variables.",
    ticket_id: 5,
    author_id: 3,
    is_internal: true,
    created_at: "2026-07-04T09:15:00Z",
    updated_at: "2026-07-04T09:15:00Z",
  },
  {
    id: 6,
    body: "Please upload your package.json and deployment logs.",
    ticket_id: 9,
    author_id: 2,
    is_internal: false,
    created_at: "2026-07-06T09:00:00Z",
    updated_at: "2026-07-06T09:00:00Z",
  },
  {
    id: 7,
    body: "VPN works on my phone but not my laptop.",
    ticket_id: 3,
    author_id: 6,
    is_internal: false,
    created_at: "2026-07-03T10:00:00Z",
    updated_at: "2026-07-03T10:00:00Z",
  },
  {
    id: 8,
    body: "Possible outdated wireless driver.",
    ticket_id: 3,
    author_id: 3,
    is_internal: true,
    created_at: "2026-07-03T10:30:00Z",
    updated_at: "2026-07-03T10:30:00Z",
  },
];

describe("GET /api/tickets/:id/comments", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  test("Requester can view comments on their own ticket", async () => {
    const token = jwt.sign(
      {
        id: 4,
        email: "diana@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [tickets[0]],
    });

    pool.query.mockResolvedValueOnce({
      rows: comments.filter((c) => c.ticket_id === 1 && !c.is_internal),
    });

    const response = await request(app)
      .get("/api/tickets/1/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(3);

    response.body.forEach((comment) => {
      expect(comment.is_internal).toBe(false);
    });
  });
  test("Requester cannot view another user's ticket", async () => {
    const token = jwt.sign(
      {
        id: 4,
        email: "diana@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: tickets.filter((t) => t.id === 2),
    });

    const response = await request(app)
      .get("/api/tickets/2/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
  test("Requester does not receive internal comments", async () => {
    const token = jwt.sign(
      {
        id: 4,
        email: "diana@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: tickets.filter((t) => t.id === 5),
    });

    pool.query.mockResolvedValueOnce({
      rows: comments.filter((c) => c.ticket_id === 5 && !c.is_internal),
    });

    const response = await request(app)
      .get("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(1);

    expect(response.body.some((c) => c.is_internal)).toBe(false);
  });
  test("Agent can view public and internal comments", async () => {
    const token = jwt.sign(
      {
        id: 2,
        email: "bob@example.com",
        role: "AGENT",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: tickets.filter((t) => t.id === 5),
    });

    pool.query.mockResolvedValueOnce({
      rows: comments.filter((c) => c.ticket_id === 5),
    });

    const response = await request(app)
      .get("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(2);

    expect(response.body.some((c) => c.is_internal)).toBe(true);
  });
  test("Admin can view public and internal comments", async () => {
    const token = jwt.sign(
      {
        id: 1,
        email: "alice@example.com",
        role: "ADMIN",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: tickets.filter((t) => t.id === 5),
    });

    pool.query.mockResolvedValueOnce({
      rows: comments.filter((c) => c.ticket_id === 5),
    });

    const response = await request(app)
      .get("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(2);
  });
  test("404 when ticket does not exist", async () => {
    const token = jwt.sign(
      {
        id: 1,
        email: "alice@example.com",
        role: "ADMIN",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const response = await request(app)
      .get("/api/tickets/999/comments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
  test("401 when no token is provided", async () => {
    const response = await request(app).get("/api/tickets/1/comments");

    expect(response.status).toBe(401);
  });
  test("403 when token is invalid", async () => {
    const response = await request(app)
      .get("/api/tickets/1/comments")
      .set("Authorization", "Bearer invalid");

    expect(response.status).toBe(403);
  });
});

describe("GET /api/tickets/:ticketId/comments/:commentId", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("Requester can access their own comment", async () => {
    const token = jwt.sign(
      {
        id: 4,
        email: "diana@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [comments.find((c) => c.id === 3)],
    });

    const response = await request(app)
      .get("/api/tickets/1/comments/3")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(comments[2]);
    expect(response.status).toBe(200);
  });

  test("Requester cannot access another user's comment", async () => {
    const token = jwt.sign(
      {
        id: 4,
        email: "diana@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [comments.find((c) => c.id === 7)],
    });

    const response = await request(app)
      .get("/api/tickets/3/comments/7")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

  test("Agent can access any comment", async () => {
    const token = jwt.sign(
      {
        id: 2,
        email: "bob@example.com",
        role: "AGENT",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [comments.find((c) => c.id === 7)],
    });

    const response = await request(app)
      .get("/api/tickets/3/comments/7")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comments[6]);
  });

  test("Admin can access any comment", async () => {
    const token = jwt.sign(
      {
        id: 1,
        email: "alice@example.com",
        role: "ADMIN",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [comments.find((c) => c.id === 5)],
    });

    const response = await request(app)
      .get("/api/tickets/5/comments/5")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comments[4]);
  });

  test("Returns 404 when comment does not exist", async () => {
    const token = jwt.sign(
      {
        id: 1,
        email: "alice@example.com",
        role: "ADMIN",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const response = await request(app)
      .get("/api/tickets/1/comments/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("Returns 401 when no token is provided", async () => {
    const response = await request(app).get("/api/tickets/1/comments/3");

    expect(response.status).toBe(401);
  });

  test("Returns 403 when token is invalid", async () => {
    const response = await request(app)
      .get("/api/tickets/1/comments/3")
      .set("Authorization", "Bearer invalid");

    expect(response.status).toBe(403);
  });
});

describe("POST /api/tickets/:ticketId/comments", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("Requester can create a public comment on their own ticket", async () => {
    const token = jwt.sign(users[3], "test-secret"); // Diana (id 4)

    pool.query.mockResolvedValueOnce({ rows: [tickets[0]] }); // ticket 1
    pool.query.mockResolvedValueOnce({ rows: users[3] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Thanks for the update.",
          ticket_id: 1,
          author_id: 4,
          isInternal: false,
        },
      ],
    });

    const response = await request(app)
      .post("/api/tickets/1/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Thanks for the update.",
        is_internal: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      author_id: 4,
      body: "Thanks for the update.",
      id: 9,
      isInternal: false,
      ticket_id: 1,
    });
  });

  test("Requester cannot create an internal comment", async () => {
    const token = jwt.sign(users[3], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [tickets[0]] });
    pool.query.mockResolvedValueOnce({ rows: [users[3]] });

    const response = await request(app)
      .post("/api/tickets/1/comments")

      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Internal note",
        isInternal: true,
      });

    expect(response.status).toBe(403);
  });

  test("Requester cannot comment on another user's ticket", async () => {
    const token = jwt.sign(users[3], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [tickets[1]] });
    pool.query.mockResolvedValueOnce({ rows: [users[3]] });

    const response = await request(app)
      .post("/api/tickets/2/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Can I help?",
        isInternal: false,
      });

    expect(response.status).toBe(403);
  });

  test("Agent can create a public comment", async () => {
    const token = jwt.sign(users[1], "test-secret"); // Bob

    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: users[1] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Working on it.",
          ticket_id: 5,
          author_id: 2,
          isInternal: false,
        },
      ],
    });

    const response = await request(app)
      .post("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Working on it.",
        isInternal: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      author_id: 2,
      body: "Working on it.",
      id: 9,
      isInternal: false,
      ticket_id: 5,
    });
  });

  test("Agent can create an internal comment", async () => {
    const token = jwt.sign(users[1], "test-secret"); // Bob

    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: users[1] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Need to inspect logs.",
          ticket_id: 5,
          author_id: 2,
          is_internal: true,
        },
      ],
    });

    const response = await request(app)
      .post("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Need to inspect logs.",
        is_internal: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      author_id: 2,
      body: "Need to inspect logs.",
      id: 9,
      is_internal: true,
      ticket_id: 5,
    });
  });

  test("Admin can create a public comment", async () => {
    const token = jwt.sign(users[0], "test-secret"); // Alice

    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: users[0] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Issue has been escalated.",
          ticket_id: 5,
          author_id: 1,
          is_internal: false,
        },
      ],
    });

    const response = await request(app)
      .post("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Issue has been escalated.",
        is_internal: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      author_id: 1,
      body: "Issue has been escalated.",
      id: 9,
      is_internal: false,
      ticket_id: 5,
    });
  });

  test("Admin can create an internal comment", async () => {
    const token = jwt.sign(users[0], "test-secret"); // Alice

    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Escalating to infrastructure.",
          ticket_id: 5,
          author_id: 1,
          is_internal: true,
        },
      ],
    });

    const response = await request(app)
      .post("/api/tickets/5/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Escalating to infrastructure.",
        is_internal: true,
      });

    expect(response.status).toBe(201);
    expect(response.body.is_internal).toBe(true);
  });

  test("Returns 404 when ticket does not exist", async () => {
    const token = jwt.sign(users[0], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .post("/api/tickets/999/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Hello",
        is_internal: false,
      });

    expect(response.status).toBe(404);
  });

  test("Returns 400 when body is missing", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Escalating to infrastructure.",
          ticket_id: 5,
          author_id: 1,
          is_internal: true,
        },
      ],
    });
    const response = await request(app)
      .post("/api/tickets/1/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        is_internal: false,
      });

    expect(response.status).toBe(400);
  });

  test("Returns 400 when body is empty", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [tickets[4]] });
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });

    const response = await request(app)
      .post("/api/tickets/1/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "",
        is_internal: false,
      });

    expect(response.status).toBe(400);
  });

  test("Returns 401 when no token is provided", async () => {
    const response = await request(app).post("/api/tickets/1/comments").send({
      body: "Hello",
      is_internal: false,
    });

    expect(response.status).toBe(401);
  });

  test("Returns 403 when token is invalid", async () => {
    const response = await request(app)
      .post("/api/tickets/1/comments")
      .set("Authorization", "Bearer invalid-token")
      .send({
        body: "Hello",
        is_internal: false,
      });

    expect(response.status).toBe(403);
  });
});

describe("PATCH /api/tickets/:ticketId/comments/:commentId", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("Requester can update their own comment", async () => {
    const token = jwt.sign(users[3], "test-secret"); // Diana (id 4)

    pool.query.mockResolvedValueOnce({ rows: [comments[0]] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          ...comments[0],
          body: "Updated requester comment.",
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Updated requester comment.",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      author_id: 4,
      body: "Updated requester comment.",
      created_at: "2026-07-02T10:15:00Z",
      id: 1,
      is_internal: false,
      ticket_id: 1,
      updated_at: "2026-07-02T10:15:00Z",
    });
  });

  test("Agent can update their own comment", async () => {
    const token = jwt.sign(users[1], "test-secret"); // Bob

    pool.query.mockResolvedValueOnce({ rows: [comments[1]] });
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          ...comments[1],
          body: "Updated agent comment.",
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/1/comments/2")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Updated agent comment.",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      author_id: 2,
      body: "Updated agent comment.",
      created_at: "2026-07-02T11:00:00Z",
      id: 2,
      is_internal: false,
      ticket_id: 1,
      updated_at: "2026-07-02T11:00:00Z",
    });
  });

  test("Admin can update their own comment", async () => {
    const token = jwt.sign(users[0], "test-secret");

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Original admin comment.",
          ticket_id: 1,
          author_id: 1,
          is_internal: true,
        },
      ],
    });

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 9,
          body: "Updated admin comment.",
          ticket_id: 1,
          author_id: 1,
          is_internal: true,
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/1/comments/9")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Updated admin comment.",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      author_id: 1,
      body: "Updated admin comment.",
      id: 9,
      is_internal: true,
      ticket_id: 1,
    });
  });

  test("Requester cannot update another requester's comment", async () => {
    const token = jwt.sign(users[3], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [comments[6]] });

    const response = await request(app)
      .patch("/api/tickets/3/comments/7")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Should not work.",
      });

    expect(response.status).toBe(403);
  });

  test("Requester cannot update an agent's comment", async () => {
    const token = jwt.sign(users[3], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [comments[1]] });

    const response = await request(app)
      .patch("/api/tickets/1/comments/2")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Should not work.",
      });

    expect(response.status).toBe(403);
  });

  test("Agent cannot update another agent's comment", async () => {
    const token = jwt.sign(users[1], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [comments[7]] });

    const response = await request(app)
      .patch("/api/tickets/3/comments/8")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Should not work.",
      });

    expect(response.status).toBe(403);
  });

  test("Agent cannot update a requester's comment", async () => {
    const token = jwt.sign(users[1], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [comments[0]] });

    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Should not work.",
      });

    expect(response.status).toBe(403);
  });

  test("Admin cannot update another user's comment", async () => {
    const token = jwt.sign(users[0], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [comments[0]] });

    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Should not work.",
      });

    expect(response.status).toBe(403);
  });

  test("Returns 404 when comment does not exist", async () => {
    const token = jwt.sign(users[1], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app)
      .patch("/api/tickets/1/comments/999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "Updated comment.",
      });

    expect(response.status).toBe(404);
  });

  test("Returns 400 when body is missing", async () => {
    const token = jwt.sign(users[3], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [comments[0]] });
    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("Returns 400 when body is empty", async () => {
    const token = jwt.sign(users[3], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [comments[0]] });
    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        body: "",
      });

    expect(response.status).toBe(400);
  });

  test("Returns 401 when no token is provided", async () => {
    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .send({
        body: "Updated comment.",
      });

    expect(response.status).toBe(401);
  });

  test("Returns 403 when token is invalid", async () => {
    const response = await request(app)
      .patch("/api/tickets/1/comments/1")
      .set("Authorization", "Bearer invalid-token")
      .send({
        body: "Updated comment.",
      });

    expect(response.status).toBe(403);
  });
});
