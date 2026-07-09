jest.mock("../db", () => ({
  query: jest.fn(),
}));
const testTickets = [
  {
    id: 1,
    title: "Need GitHub access",
    description: "Please add me to the organization repo so I can contribute.",
    status: "OPEN",
    priority: "MEDIUM",
    category: "Account Access",
    requester_id: 1,
    assignee_id: null,
    created_at: "2026-07-09T10:00:00.000Z",
    updated_at: "2026-07-09T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Website homepage is broken",
    description:
      "The homepage loads a blank screen after the latest deployment.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Website Bug",
    requester_id: 3,
    assignee_id: 2,
    created_at: "2026-07-09T10:15:00.000Z",
    updated_at: "2026-07-09T10:45:00.000Z",
  },
  {
    id: 3,
    title: "Deployment failed on Vercel",
    description:
      "The build fails during deployment with an environment variable error.",
    status: "OPEN",
    priority: "HIGH",
    category: "Deployment Issue",
    requester_id: 4,
    assignee_id: null,
    created_at: "2026-07-09T11:00:00.000Z",
    updated_at: "2026-07-09T11:00:00.000Z",
  },
  {
    id: 4,
    title: "Laptop will not connect to Wi-Fi",
    description:
      "My laptop cannot connect to the organization Wi-Fi during meetings.",
    status: "WAITING_ON_USER",
    priority: "MEDIUM",
    category: "Hardware/Device",
    requester_id: 5,
    assignee_id: 2,
    created_at: "2026-07-08T14:30:00.000Z",
    updated_at: "2026-07-09T09:20:00.000Z",
  },
  {
    id: 5,
    title: "Need help installing project dependencies",
    description: "npm install is failing with dependency conflict errors.",
    status: "RESOLVED",
    priority: "LOW",
    category: "Software Help",
    requester_id: 6,
    assignee_id: 7,
    created_at: "2026-07-07T16:00:00.000Z",
    updated_at: "2026-07-08T12:00:00.000Z",
  },
  {
    id: 6,
    title: "Cannot access admin dashboard",
    description:
      "I should have admin access, but the dashboard says unauthorized.",
    status: "OPEN",
    priority: "CRITICAL",
    category: "Account Access",
    requester_id: 8,
    assignee_id: null,
    created_at: "2026-07-09T12:00:00.000Z",
    updated_at: "2026-07-09T12:00:00.000Z",
  },
  {
    id: 7,
    title: "API returning 500 on ticket creation",
    description: "Submitting the create ticket form causes a server error.",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    category: "Website Bug",
    requester_id: 9,
    assignee_id: 2,
    created_at: "2026-07-09T12:20:00.000Z",
    updated_at: "2026-07-09T12:50:00.000Z",
  },
  {
    id: 8,
    title: "Need environment variables added",
    description:
      "The frontend cannot connect to the API because the deployed environment variables are missing.",
    status: "WAITING_ON_USER",
    priority: "HIGH",
    category: "Deployment Issue",
    requester_id: 10,
    assignee_id: 7,
    created_at: "2026-07-08T18:10:00.000Z",
    updated_at: "2026-07-09T08:45:00.000Z",
  },
  {
    id: 9,
    title: "Question about using the ticket system",
    description:
      "I am not sure which category to choose when submitting a request.",
    status: "CLOSED",
    priority: "LOW",
    category: "General Question",
    requester_id: 11,
    assignee_id: 2,
    created_at: "2026-07-06T09:00:00.000Z",
    updated_at: "2026-07-07T10:30:00.000Z",
  },
  {
    id: 10,
    title: "Software license request",
    description:
      "I need access to a licensed design tool for the project team.",
    status: "RESOLVED",
    priority: "MEDIUM",
    category: "Software Help",
    requester_id: 12,
    assignee_id: 7,
    created_at: "2026-07-05T13:15:00.000Z",
    updated_at: "2026-07-06T15:40:00.000Z",
  },
];

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const request = require("supertest");
const pool = require("../db");
const app = require("../app");

describe("GET /api/tickets", () => {
  beforeEach(() => pool.query.mockReset());
  test("GET /api/tickets blocks REQUESTER from seeing all tickets", async () => {
    const token = jwt.sign(
      {
        userId: 1,
        email: "requester@example.com",
        role: "REQUESTER",
      },
      "test-secret",
    );

    const response = await request(app)
      .get("/api/tickets")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(403);
    expect(response.body.tickets).toBeUndefined();
    expect(pool.query).not.toHaveBeenCalled();
  });
  test("GET /api/tickets allows AGENT to see all tickets", async () => {
    const token = jwt.sign(
      {
        userId: 2,
        email: "agent@example.com",
        role: "AGENT",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: testTickets,
    });

    const response = await request(app)
      .get("/api/tickets")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testTickets);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
  test("GET /api/tickets allows ADMIN to see all tickets", async () => {
    const token = jwt.sign(
      {
        userId: 2,
        email: "agent@example.com",
        role: "ADMIN",
      },
      "test-secret",
    );

    pool.query.mockResolvedValueOnce({
      rows: testTickets,
    });

    const response = await request(app)
      .get("/api/tickets")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testTickets);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
  test("GET /api/tickets blocks NO TOKEN from seeing all tickets", async () => {
    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(401);
    expect(response.body.tickets).toBeUndefined();
    expect(pool.query).not.toHaveBeenCalled();
  });
  test("GET /api/tickets blocks BAD TOKEN from seeing all tickets", async () => {
    const response = await request(app)
      .get("/api/tickets")
      .set({ Authorization: `Bearer {20020}` });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("invalid token");
    expect(response.body.tickets).toBeUndefined();
    expect(pool.query).not.toHaveBeenCalled();
  });
});

describe("GET /api/tickets/me", () => {
  beforeEach(() => pool.query.mockReset());
  test("GET /api/tickets/me allow user id 1 to view there own tickets", async () => {
    const token = jwt.sign(
      {
        id: 1,
        role: "Requester",
        email: "example@example.com",
      },
      "test-secret",
    );
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          title: "Need GitHub access",
          description:
            "Please add me to the organization repo so I can contribute.",
          status: "OPEN",
          priority: "MEDIUM",
          category: "Account Access",
          requester_id: 1,
          assignee_id: null,
          created_at: "2026-07-09T10:00:00.000Z",
          updated_at: "2026-07-09T10:00:00.000Z",
        },
      ],
    });
    const response = await request(app)
      .get("/api/tickets/me")
      .set({ Authorization: `Bearer ${token}` });

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("requester_id"),
      [1],
    );
  });
  test("GET /api/tickets/me block unauthenticated user", async () => {
    const response = await request(app).get("/api/tickets/me");

    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
});

describe("GET /api/tickets/:id", () => {
  beforeEach(() => pool.query.mockReset());
  test("GET /api/tickets/:id allows user to view ticket they own", async () => {
    const token = jwt.sign(
      {
        id: 12,
        role: "REQUESTER",
        email: "request@email.com",
      },
      "test-secret",
    );
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description:
            "I need access to a licensed design tool for the project team.",
          status: "RESOLVED",
          priority: "MEDIUM",
          category: "Software Help",
          requester_id: 12,
          assignee_id: 7,
          created_at: "2026-07-05T13:15:00.000Z",
          updated_at: "2026-07-06T15:40:00.000Z",
        },
      ],
    });
    const response = await request(app)
      .get("/api/tickets/10")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 10,
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      status: "RESOLVED",
      priority: "MEDIUM",
      category: "Software Help",
      requester_id: 12,
      assignee_id: 7,
      created_at: "2026-07-05T13:15:00.000Z",
      updated_at: "2026-07-06T15:40:00.000Z",
    });
  });
  test("GET /api/tickets/:id does not allow user to view ticket they do not own", async () => {
    const token = jwt.sign(
      {
        id: 10,
        role: "REQUESTER",
        email: "request@email.com",
      },
      "test-secret",
    );
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description:
            "I need access to a licensed design tool for the project team.",
          status: "RESOLVED",
          priority: "MEDIUM",
          category: "Software Help",
          requester_id: 12,
          assignee_id: 7,
          created_at: "2026-07-05T13:15:00.000Z",
          updated_at: "2026-07-06T15:40:00.000Z",
        },
      ],
    });
    const response = await request(app)
      .get("/api/tickets/10")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "user not authorized to view ticket",
    });
  });
  test("GET /api/tickets/:id allows admin to view ticket they do not own", async () => {
    const token = jwt.sign(
      {
        id: 10,
        role: "ADMIN",
        email: "request@email.com",
      },
      "test-secret",
    );
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description:
            "I need access to a licensed design tool for the project team.",
          status: "RESOLVED",
          priority: "MEDIUM",
          category: "Software Help",
          requester_id: 12,
          assignee_id: 7,
          created_at: "2026-07-05T13:15:00.000Z",
          updated_at: "2026-07-06T15:40:00.000Z",
        },
      ],
    });
    const response = await request(app)
      .get("/api/tickets/10")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 10,
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      status: "RESOLVED",
      priority: "MEDIUM",
      category: "Software Help",
      requester_id: 12,
      assignee_id: 7,
      created_at: "2026-07-05T13:15:00.000Z",
      updated_at: "2026-07-06T15:40:00.000Z",
    });
  });
  test("GET /api/tickets/:id allows agent to view ticket they do not own", async () => {
    const token = jwt.sign(
      {
        id: 10,
        role: "AGENT",
        email: "request@email.com",
      },
      "test-secret",
    );
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description:
            "I need access to a licensed design tool for the project team.",
          status: "RESOLVED",
          priority: "MEDIUM",
          category: "Software Help",
          requester_id: 12,
          assignee_id: 7,
          created_at: "2026-07-05T13:15:00.000Z",
          updated_at: "2026-07-06T15:40:00.000Z",
        },
      ],
    });
    const response = await request(app)
      .get("/api/tickets/10")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 10,
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      status: "RESOLVED",
      priority: "MEDIUM",
      category: "Software Help",
      requester_id: 12,
      assignee_id: 7,
      created_at: "2026-07-05T13:15:00.000Z",
      updated_at: "2026-07-06T15:40:00.000Z",
    });
  });
});

describe("POST /api/tickets/", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  test("POST /api/tickets/ user can create a ticket", async () => {
    const token = jwt.sign(
      {
        id: 1,
        role: "REQUESTER",
        email: "test@example.com",
      },
      "test-secret",
    );
    const ticket = {
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
    };
    const createdTicket = {
      id: 1,
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
      requester_id: 1,
      priority: "LOW",
      status: "OPEN",
      assignee_id: null,
      created_at: "2026-07-09T10:00:00.000Z",
      updated_at: "2026-07-09T10:00:00.000Z",
    };
    pool.query.mockResolvedValueOnce({ rows: [{ createdTicket }] });
    const response = await request(app)
      .post("/api/tickets")
      .set({ Authorization: `Bearer ${token}` })
      .send(ticket);
    expect(response.status).toBe(201);
  });
  test("POST /api/tickets/ unauthenticated can not create a ticket", async () => {
    const ticket = {
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
    };

    const response = await request(app)
      .post("/api/tickets")
      .set({ Authorization: `Bearer` })
      .send(ticket);
    expect(response.status).toBe(403);
  });
});

describe("POST /api/tickets/", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  test("POST /api/tickets/ user can create a ticket", async () => {
    const token = jwt.sign(
      {
        id: 1,
        role: "REQUESTER",
        email: "test@example.com",
      },
      "test-secret",
    );
    const ticket = {
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
    };
    const createdTicket = {
      id: 1,
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
      requester_id: 1,
      priority: "LOW",
      status: "OPEN",
      assignee_id: null,
      created_at: "2026-07-09T10:00:00.000Z",
      updated_at: "2026-07-09T10:00:00.000Z",
    };
    pool.query.mockResolvedValueOnce({ rows: [{ createdTicket }] });
    const response = await request(app)
      .post("/api/tickets")
      .set({ Authorization: `Bearer ${token}` })
      .send(ticket);
    expect(response.status).toBe(201);
  });
  test("POST /api/tickets/ unauthenticated can not create a ticket", async () => {
    const ticket = {
      title: "Software license request",
      description:
        "I need access to a licensed design tool for the project team.",
      category: "Software Help",
      location: "Beatty",
    };

    const response = await request(app)
      .post("/api/tickets")
      .set({ Authorization: `Bearer` })
      .send(ticket);
    expect(response.status).toBe(403);
  });
});

describe("PATCH /api/tickets/:1", () => {
  beforeEach(() => pool.query.mockReset());
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const otherRequesterToken = jwt.sign(
    {
      id: 99,
      role: "REQUESTER",
      email: "other@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER can update own ticket title, description, location, and category", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            description: "Old description",
            location: "Old location",
            category: "General Question",
            priority: "LOW",
            status: "OPEN",
            created_at: "2026-07-05T13:15:00.000Z",
            updated_at: "2026-07-06T15:40:00.000Z",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "New title",
            description: "New description",
            location: "New location",
            category: "Software Help",
            priority: "LOW",
            status: "OPEN",
            created_at: "2026-07-05T13:15:00.000Z",
            updated_at: "2026-07-06T15:40:00.000Z",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set({ Authorization: `Bearer ${requesterToken}` })
      .send({
        title: "New title",
        description: "New description",
        location: "New location",
        category: "Software Help",
      });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      id: 10,
      requester_id: 1,
      assignee_id: null,
      title: "New title",
      description: "New description",
      location: "New location",
      category: "Software Help",
      priority: "LOW",
      status: "OPEN",
      created_at: "2026-07-05T13:15:00.000Z",
      updated_at: "2026-07-06T15:40:00.000Z",
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("REQUESTER cannot update own ticket priority, status, requester_id, or assignee_id", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            description: "Old description",
            location: "Old location",
            category: "General Question",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Allowed title update",
            description: "Allowed description update",
            location: "Allowed location update",
            category: "Software Help",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${requesterToken}`)
      .send({
        title: "Allowed title update",
        description: "Allowed description update",
        location: "Allowed location update",
        category: "Software Help",
        priority: "CRITICAL",
        status: "RESOLVED",
        requester_id: 99,
        assignee_id: 2,
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      requester_id: 1,
      assignee_id: null,
      title: "Allowed title update",
      description: "Allowed description update",
      location: "Allowed location update",
      category: "Software Help",
      priority: "LOW",
      status: "OPEN",
    });

    expect(response.body.priority).not.toBe("CRITICAL");
    expect(response.body.status).not.toBe("RESOLVED");
    expect(response.body.requester_id).not.toBe(99);
    expect(response.body.assignee_id).not.toBe(2);
  });

  test("REQUESTER cannot update another requester's ticket", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          requester_id: 1,
          assignee_id: null,
          title: "Someone else's ticket",
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${otherRequesterToken}`)
      .send({
        title: "Trying to update someone else's ticket",
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "user not authorized to view ticket",
    });

    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("AGENT can update any ticket title, description, location, and category", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            description: "Old description",
            location: "Old location",
            category: "General Question",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Agent updated title",
            description: "Agent updated description",
            location: "Agent updated location",
            category: "Software Help",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        title: "Agent updated title",
        description: "Agent updated description",
        location: "Agent updated location",
        category: "Software Help",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      requester_id: 1,
      assignee_id: null,
      title: "Agent updated title",
      description: "Agent updated description",
      location: "Agent updated location",
      category: "Software Help",
      priority: "LOW",
      status: "OPEN",
    });
  });

  test("ADMIN can update any ticket title, description, location, and category", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            description: "Old description",
            location: "Old location",
            category: "General Question",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Admin updated title",
            description: "Admin updated description",
            location: "Admin updated location",
            category: "Software Help",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Admin updated title",
        description: "Admin updated description",
        location: "Admin updated location",
        category: "Software Help",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      requester_id: 1,
      assignee_id: null,
      title: "Admin updated title",
      description: "Admin updated description",
      location: "Admin updated location",
      category: "Software Help",
      priority: "LOW",
      status: "OPEN",
    });
  });

  test("AGENT cannot update requester_id through this route", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Agent update",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        title: "Agent update",
        requester_id: 99,
      });

    expect(response.status).toBe(200);
    expect(response.body.requester_id).toBe(1);
    expect(response.body.requester_id).not.toBe(99);
  });

  test("ADMIN cannot update requester_id through this route", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Old title",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            title: "Admin update",
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Admin update",
        requester_id: 99,
      });

    expect(response.status).toBe(200);
    expect(response.body.requester_id).toBe(1);
    expect(response.body.requester_id).not.toBe(99);
  });
});

describe("PATCH /api/tickets/:ticketId/priority", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER cannot update ticket priority", async () => {
    pool.query.mockResolvedValueOnce({ rows: [testTickets[9]] });
    const response = await request(app)
      .patch("/api/tickets/10/priority")
      .set({ Authorization: `Bearer ${requesterToken}` })
      .send({
        priority: "HIGH",
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "user does not have permission to update ticket priority",
    });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("AGENT can update ticket priority", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "HIGH",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/priority")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        priority: "HIGH",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      priority: "HIGH",
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN can update ticket priority", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "CRITICAL",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/priority")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        priority: "CRITICAL",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      priority: "CRITICAL",
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("returns 401 when no token is provided", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: null,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });
    const response = await request(app).patch("/api/tickets/10/priority").send({
      priority: "HIGH",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "could not find token" });
    expect(pool.query).not.toHaveBeenCalled();
  });

  test("returns 400 for invalid priority", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: null,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });
    const response = await request(app)
      .patch("/api/tickets/10/priority")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        priority: "SUPER_HIGH",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "not a valid priority" });
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe("PATCH /api/tickets/:ticketId/status", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER cannot update ticket status", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: null,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });
    const response = await request(app)
      .patch("/api/tickets/10/status")
      .set("Authorization", `Bearer ${requesterToken}`)
      .send({
        status: "IN_PROGRESS",
      });

    expect(response.status).toBe(403);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("AGENT can update ticket status", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "IN_PROGRESS",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/status")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        status: "IN_PROGRESS",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      status: "IN_PROGRESS",
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN can update ticket status", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "IN_PROGRESS",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "RESOLVED",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "RESOLVED",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      status: "RESOLVED",
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("returns 401 when no token is provided", async () => {
    const response = await request(app).patch("/api/tickets/10/status").send({
      status: "IN_PROGRESS",
    });

    expect(response.status).toBe(401);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(0);
  });

  test("returns 400 for invalid status", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: null,
          priority: "LOW",
          status: "RESOLVED",
        },
      ],
    });
    const response = await request(app)
      .patch("/api/tickets/10/status")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        status: "SUPER_OPEN",
      });

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe("PATCH /api/tickets/:ticketId/assignee", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER cannot assign a ticket", async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [testTickets[9]] })
      .mockResolvedValueOnce({
        rows: [
          {
            role: "AGENT",
          },
        ],
      });
    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${requesterToken}`)
      .send({
        assigneeId: 2,
      });
    expect(response.status).toBe(403);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("AGENT cannot assign a ticket", async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [testTickets[9]] })
      .mockResolvedValueOnce({
        rows: [
          {
            role: "AGENT",
          },
        ],
      });
    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${agentToken}`)
      .send({
        assigneeId: 3,
      });

    expect(response.status).toBe(403);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN can assign ticket to an existing AGENT", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 2,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            first_name: "Ada",
            last_name: "Lovelace",
            email: "agent@example.com",
            role: "AGENT",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 2,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: 2,
      });

    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(response.body).toMatchObject({
      id: 10,
      assignee_id: 2,
    });
    expect(response.status).toBe(200);
  });

  test("ADMIN can assign ticket to an existing ADMIN", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 3,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 3,
            first_name: "Grace",
            last_name: "Hopper",
            email: "admin@example.com",
            role: "ADMIN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 3,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: 3,
      });

    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      assignee_id: 3,
    });
  });

  test("ADMIN cannot assign ticket to a REQUESTER", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 3,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 4,
            first_name: "Request",
            last_name: "User",
            email: "requester2@example.com",
            role: "REQUESTER",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN cannot assign ticket to a user that does not exist", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 3,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: 999,
      });

    expect(response.status).toBe(404);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("returns 401 when no token is provided", async () => {
    const response = await request(app).patch("/api/tickets/10/assignee").send({
      assigneeId: 2,
    });

    expect(response.status).toBe(401);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).not.toHaveBeenCalled();
  });

  test("returns 400 when assigneeId is missing", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: 3,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });
    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("returns 400 when assigneeId is not valid", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: 3,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });
    const response = await request(app)
      .patch("/api/tickets/10/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: "not-a-number",
      });

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("ADMIN gets 404 when assigning a ticket that does not exist", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            first_name: "Ada",
            last_name: "Lovelace",
            email: "agent@example.com",
            role: "AGENT",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [],
      });

    const response = await request(app)
      .patch("/api/tickets/999/assignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        assigneeId: 2,
      });

    expect(response.status).toBe(404);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(2);
  });
});

describe("PATCH /api/tickets/:ticketId/assignMe", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER cannot assign ticket to themselves", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          title: "Software license request",
          description: "Need access to design software.",
          category: "Software Help",
          location: "Beatty",
          requester_id: 1,
          assignee_id: null,
          priority: "LOW",
          status: "OPEN",
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/10/assignMe")
      .set("Authorization", `Bearer ${requesterToken}`)
      .send();

    expect(response.status).toBe(403);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    // ticketValidation ran, but assignTicketMe should not update anything
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("AGENT can assign ticket to themselves", async () => {
    pool.query
      // ticketValidation checks ticket exists
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      // assignTicketMe updates assignee_id to req.user.id
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 2,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignMe")
      .set("Authorization", `Bearer ${agentToken}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      assignee_id: 2,
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN can assign ticket to themselves", async () => {
    pool.query
      // ticketValidation checks ticket exists
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: null,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      })
      // assignTicketMe updates assignee_id to req.user.id
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            title: "Software license request",
            description: "Need access to design software.",
            category: "Software Help",
            location: "Beatty",
            requester_id: 1,
            assignee_id: 3,
            priority: "LOW",
            status: "OPEN",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/assignMe")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: 10,
      assignee_id: 3,
    });

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("returns 401 when no token is provided", async () => {
    const response = await request(app)
      .patch("/api/tickets/10/assignMe")
      .send();

    expect(response.status).toBe(401);
    expect(response.body.ticket).toBeUndefined();

    // validateToken should stop the request before ticketValidation
    expect(pool.query).not.toHaveBeenCalled();
  });

  test("returns 404 when ticket does not exist", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const response = await request(app)
      .patch("/api/tickets/999/assignMe")
      .set("Authorization", `Bearer ${agentToken}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    // ticketValidation ran, but assignTicketMe should not run
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("returns 400 when ticketId is invalid", async () => {
    const response = await request(app)
      .patch("/api/tickets/not-a-number/assignMe")
      .set("Authorization", `Bearer ${agentToken}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();

    // Ideally ticketValidation catches invalid ticketId before SQL
    expect(pool.query).not.toHaveBeenCalled();
  });
});
describe("PATCH /api/tickets/:ticketId/removeAssignee", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  const requesterToken = jwt.sign(
    {
      id: 1,
      role: "REQUESTER",
      email: "requester@example.com",
    },
    "test-secret",
  );

  const agentToken = jwt.sign(
    {
      id: 2,
      role: "AGENT",
      email: "agent@example.com",
    },
    "test-secret",
  );

  const adminToken = jwt.sign(
    {
      id: 3,
      role: "ADMIN",
      email: "admin@example.com",
    },
    "test-secret",
  );

  test("REQUESTER cannot remove a ticket assignee", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 10,
          requester_id: 1,
          assignee_id: 2,
          status: "OPEN",
          priority: "LOW",
        },
      ],
    });

    const response = await request(app)
      .patch("/api/tickets/10/removeAssignee")
      .set("Authorization", `Bearer ${requesterToken}`)
      .send();

    expect(response.status).toBe(403);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("AGENT can remove a ticket assignee", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: 2,
            status: "OPEN",
            priority: "LOW",
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            status: "OPEN",
            priority: "LOW",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/removeAssignee")
      .set("Authorization", `Bearer ${agentToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("ADMIN can remove a ticket assignee", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: 2,
            status: "OPEN",
            priority: "LOW",
          },
        ],
      })

      .mockResolvedValueOnce({
        rows: [
          {
            id: 10,
            requester_id: 1,
            assignee_id: null,
            status: "OPEN",
            priority: "LOW",
          },
        ],
      });

    const response = await request(app)
      .patch("/api/tickets/10/removeAssignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  test("returns 401 when no token is provided", async () => {
    const response = await request(app)
      .patch("/api/tickets/10/removeAssignee")
      .send();

    expect(response.status).toBe(401);
    expect(response.body.ticket).toBeUndefined();

    expect(pool.query).not.toHaveBeenCalled();
  });

  test("returns 404 when ticket does not exist", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const response = await request(app)
      .patch("/api/tickets/999/removeAssignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.ticket).toBeUndefined();
    expect(response.body.message).toBeDefined();

    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("returns 400 when ticketId is invalid", async () => {
    const response = await request(app)
      .patch("/api/tickets/not-a-number/removeAssignee")
      .set("Authorization", `Bearer ${adminToken}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.ticket).toBeUndefined();

    expect(pool.query).not.toHaveBeenCalled();
  });
});
