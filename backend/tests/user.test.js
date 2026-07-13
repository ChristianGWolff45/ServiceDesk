const pool = require("../db");
const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
jest.mock("../db", () => ({
  query: jest.fn(),
}));
const users = [
  {
    id: 1,
    email: "requester@email.com",
    role: "REQUESTER",
    first_name: "Christian",
    last_name: "Wolff",
  },
  {
    id: 2,
    email: "AGENT@email.com",
    role: "AGENT",
    first_name: "Christian",
    last_name: "Wolff",
  },
  {
    id: 3,
    email: "ADMIN@email.com",
    role: "ADMIN",
    first_name: "Christian",
    last_name: "Wolff",
  },
];

const returnUsers = [
  {
    email: "requester@email.com",
    firstName: "Christian",
    id: 1,
    lastName: "Wolff",
    role: "REQUESTER",
  },
  {
    email: "AGENT@email.com",
    firstName: "Christian",
    id: 2,
    lastName: "Wolff",
    role: "AGENT",
  },
  {
    email: "ADMIN@email.com",
    firstName: "Christian",
    id: 3,
    lastName: "Wolff",
    role: "ADMIN",
  },
];

const newUserResult = {
  id: 1,
  email: "newuser@email.com",
  first_name: "new",
  last_name: "requester",
  temp_password: "Password123!",
  role: "REQUESTER",
};

describe("GET /api/users", () => {
  beforeEach(() => pool.query.mockReset);
  //unauthenticated cannot retrieve users
  test("unauthenticated cannot retrieve users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  //REQUESTERS can retrieve users
  test("REQUESTERS can retrieve users", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
  //AGENTS can retrieve users
  test("AGENTS can retrieve users", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
  //ADMINs can retrieve users
  test("ADMIN can retrieve users", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
});

describe("GET /api/users/staff", () => {
  beforeEach(() => pool.query.mockReset);
  //unauthenticated cannot retrieve users
  test("unauthenticated cannot retrieve users", async () => {
    const response = await request(app).get("/api/users/staff");
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  //REQUESTERS can retrieve users
  test("REQUESTERS can retrieve staff", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users/staff")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
  //AGENTS can retrieve users
  test("AGENTS can retrieve staff", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users/staff")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
  //ADMINs can retrieve users
  test("ADMIN can retrieve staff", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: users });
    const response = await request(app)
      .get("/api/users/staff")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers);
  });
});

describe("GET /api/users/:userId", () => {
  beforeEach(() => pool.query.mockReset);
  //unauthenticated cannot retrieve user
  test("unauthenticated cannot retrieve user", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  //REQUESTERS can retrieve user
  test("REQUESTERS can retrieve user", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/1")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers[0]);
  });
  //AGENTS can retrieve users
  test("AGENTS can retrieve staff", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/1")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers[0]);
  });
  //ADMINs can retrieve users
  test("ADMIN can retrieve staff", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/1")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(returnUsers[0]);
  });
});

describe("GET /api/users/byEmail/:email", () => {
  beforeEach(() => pool.query.mockReset());
  test("unauthenticated cannot retrieve user by email", async () => {
    const response = await request(app).get(
      "/api/users/byEmail/requester@email.com",
    );
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  //REQUESTERS can retrieve users
  test("REQUESTERS can retrieve user by email", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/byEmail/requester@email.com")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users[0]);
  });
  //AGENTS can retrieve users
  test("AGENTS can retrieve user by email", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/byEmail/requester@email.com")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users[0]);
  });
  //ADMINs can retrieve users
  test("ADMIN can retrieve user by email", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[0]] });
    const response = await request(app)
      .get("/api/users/byEmail/requester@email.com")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users[0]);
  });
});

describe("POST /api/users", () => {
  beforeEach(() => pool.query.mockReset());
  test("Unauthenticated users cannot create new users", async () => {
    const response = await request(app).post("/api/users").send(users[0]);
    expect(response.status).toBe(401);
  });
  test("REQUESTERS cannot create new users", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .post("/api/users")
      .send(users[0])
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(403);
  });
  test("AGENTS cannot create new users", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .post("/api/users")
      .send(users[0])
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(403);
  });
  test("ADMIN can create new users", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [newUserResult] });
    const response = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@email.com",
        firstName: "new",
        lastName: "requester",
        tempPassword: "Password123!",
        role: "REQUESTER",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      email: "newuser@email.com",
      firstName: "new",
      lastName: "requester",
      role: "REQUESTER",
      id: 1,
    });
  });
  test("Missing temp password can create new users", async () => {
    const token = jwt.sign(users[2], "test-secret");

    const response = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@email.com",
        firstName: "new",
        lastName: "requester",
        role: "REQUESTER",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
  test("Missing first name 400 bad request", async () => {
    const token = jwt.sign(users[2], "test-secret");

    const response = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@email.com",
        tempPassword: "Password123!",
        lastName: "requester",
        role: "REQUESTER",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
  test("Missing email 400 bad request", async () => {
    const token = jwt.sign(users[2], "test-secret");

    const response = await request(app)
      .post("/api/users")
      .send({
        firstName: "new",
        tempPassword: "Password123!",
        lastName: "requester",
        role: "REQUESTER",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
  test("Missing last name 400 bad request", async () => {
    const token = jwt.sign(users[2], "test-secret");

    const response = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@email.com",
        firstName: "new",
        tempPassword: "Password123!",
        role: "REQUESTER",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
  test("Missing role 400 bad request", async () => {
    const token = jwt.sign(users[2], "test-secret");

    const response = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@email.com",
        firstName: "new",
        tempPassword: "Password123!",
        lastName: "requester",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});

describe("PATCH /api/user/:userId/userRole", () => {
  beforeEach(() => pool.query.mockReset());
  test("Admin can update user role", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query
      .mockResolvedValueOnce({ rows: [users[1]] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            role: "ADMIN",
            is_active: true,
            first_name: "christian",
            last_name: "wolff",
          },
        ],
      });
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .set({ Authorization: `Bearer ${token}` })
      .send({ role: "ADMIN" });
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(result.body).toEqual({
      id: 2,
      role: "ADMIN",
      isActive: true,
      firstName: "christian",
      lastName: "wolff",
    });
    expect(result.status).toBe(200);
  });
  test("AGENT cannot update user role", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[1]] });
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .set({ Authorization: `Bearer ${token}` })
      .send({ role: "ADMIN" });
    expect(result.status).toBe(403);
  });
  test("REQUESTERS cannot update user role", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [users[1]] });
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .set({ Authorization: `Bearer ${token}` })
      .send({ role: "ADMIN" });
    expect(result.status).toBe(403);
  });
  test("UNAUTHENTICATED cannot update user role", async () => {
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .send({ role: "ADMIN" });
    expect(result.status).toBe(401);
  });
  test("Admin cannot update nonexistent user role", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [] });
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .set({ Authorization: `Bearer ${token}` })
      .send({ role: "ADMIN" });
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(404);
  });
  test("Admin must eter user role", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 2,
          role: "ADMIN",
          is_active: true,
          first_name: "christian",
          last_name: "wolff",
        },
      ],
    });
    const result = await request(app)
      .patch("/api/users/2/userRole")
      .set({ Authorization: `Bearer ${token}` })
      .send({});
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(400);
  });
});

describe("PATCH /api/users/:userId/deactivate", () => {
  beforeEach(() => pool.query.mockReset());

  test("Admin can deactivate a user", async () => {
    const token = jwt.sign(users[2], "test-secret");

    pool.query
      .mockResolvedValueOnce({ rows: [users[1]] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            role: "AGENT",
            is_active: false,
            first_name: "christian",
            last_name: "wolff",
          },
        ],
      });

    const result = await request(app)
      .patch("/api/users/2/deactivate")
      .set({ Authorization: `Bearer ${token}` });

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(result.body).toEqual({
      id: 2,
      role: "AGENT",
      isActive: false,
      firstName: "christian",
      lastName: "wolff",
    });
    expect(result.status).toBe(200);
  });

  test("AGENT cannot deactivate a user", async () => {
    const token = jwt.sign(users[1], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [users[1]] });

    const result = await request(app)
      .patch("/api/users/2/deactivate")
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(403);
  });

  test("REQUESTER cannot deactivate a user", async () => {
    const token = jwt.sign(users[0], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [users[1]] });

    const result = await request(app)
      .patch("/api/users/2/deactivate")
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(403);
  });

  test("UNAUTHENTICATED cannot deactivate a user", async () => {
    const result = await request(app).patch("/api/users/2/deactivate");

    expect(result.status).toBe(401);
  });

  test("Admin cannot deactivate a nonexistent user", async () => {
    const token = jwt.sign(users[2], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await request(app)
      .patch("/api/users/2/deactivate")
      .set({ Authorization: `Bearer ${token}` });

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(404);
  });
});

describe("PATCH /api/users/:userId/activate", () => {
  beforeEach(() => pool.query.mockReset());

  test("Admin can activate a user", async () => {
    const token = jwt.sign(users[2], "test-secret");

    pool.query
      .mockResolvedValueOnce({ rows: [users[1]] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            role: "AGENT",
            is_active: true,
            first_name: "christian",
            last_name: "wolff",
          },
        ],
      });

    const result = await request(app)
      .patch("/api/users/2/activate")
      .set({ Authorization: `Bearer ${token}` });

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(result.body).toEqual({
      id: 2,
      role: "AGENT",
      isActive: true,
      firstName: "christian",
      lastName: "wolff",
    });
    expect(result.status).toBe(200);
  });

  test("AGENT cannot activate a user", async () => {
    const token = jwt.sign(users[1], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [users[1]] });

    const result = await request(app)
      .patch("/api/users/2/activate")
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(403);
  });

  test("REQUESTER cannot activate a user", async () => {
    const token = jwt.sign(users[0], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [users[1]] });

    const result = await request(app)
      .patch("/api/users/2/activate")
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(403);
  });

  test("UNAUTHENTICATED cannot activate a user", async () => {
    const result = await request(app).patch("/api/users/2/activate");

    expect(result.status).toBe(401);
  });

  test("Admin cannot activate a nonexistent user", async () => {
    const token = jwt.sign(users[2], "test-secret");

    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await request(app)
      .patch("/api/users/2/activate")
      .set({ Authorization: `Bearer ${token}` });

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(404);
  });
});
