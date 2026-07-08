jest.mock("../db", () => ({
  query: jest.fn(),
}));

const bcrypt = require("bcrypt");
const request = require("supertest");
const pool = require("../db");
const app = require("../app");
const jwt = require("jsonwebtoken");
const expectCookies = require("supertest/lib/cookies");

describe("/api/auth/registerNewUser", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  test("POST /api/auth/registerNewUser returns 201 with safe user data", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            first_name: "Ada",
            last_name: "Lovelace",
            email: "ada@example.com",
            phone_number: "555-123-4567",
            role: "REQUESTER",
            hash_password: "hashed-password-from-db",
            password_reset: false,
          },
        ],
      });
    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
      password: "Password123!",
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();

    expect(response.body.user).toEqual({
      id: 1,
      email: "ada@example.com",
      firstName: "Ada",
      lastName: "Lovelace",
      phoneNumber: "555-123-4567",
      role: "REQUESTER",
    });

    const insertCallValues = pool.query.mock.calls[1][1];
    const storedPassword = insertCallValues[5];

    expect(storedPassword).not.toBe("Password123!");

    const passwordMatches = await bcrypt.compare(
      "Password123!",
      storedPassword,
    );
    expect(passwordMatches).toBe(true);

    const decodedToken = jwt.verify(response.body.token, "test-secret");

    expect(decodedToken).toMatchObject({
      id: 1,
      email: "ada@example.com",
      role: "REQUESTER",
    });
  });
  test("POST /api/auth/registerNewUser returns 409 user with email already exists", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: "ada@example.com" }],
    });

    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
      password: "Password123!",
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("user already exists login instead");
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  test("POST /api/auth/registerNewUser missing password", async () => {
    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "missing firstname, lastname, password, email or phone number",
    );
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("POST /api/auth/registerNewUser missing phone number", async () => {
    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "missing firstname, lastname, password, email or phone number",
    );
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("POST /api/auth/registerNewUser missing email", async () => {
    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      lastName: "Lovelace",
      phoneNumber: "555-123-4567",
      password: "Password123!",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "missing firstname, lastname, password, email or phone number",
    );
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("POST /api/auth/registerNewUser missing last name", async () => {
    const response = await request(app).post("/api/auth/registerNewUser").send({
      firstName: "Ada",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
      password: "Password123!",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "missing firstname, lastname, password, email or phone number",
    );
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("POST /api/auth/registerNewUser missing first name", async () => {
    const response = await request(app).post("/api/auth/registerNewUser").send({
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
      password: "Password123!",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "missing firstname, lastname, password, email or phone number",
    );
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
});

describe("/api/auth/login", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  test("POST /api/auth/login, return 200 valid login", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@example.com",
          phone_number: "555-123-4567",
          role: "REQUESTER",
          hash_password:
            "$2b$10$.hglnFm5R9j/a116RmusYOTth5QMEAYIuxlD/cse/qbGkSW8zTBaa",
          password_reset: false,
        },
      ],
    });
    const result = await request(app).post("/api/auth/login").send({
      password: "Password123!",
      email: "ada@example.com",
    });
    expect(result.status).toBe(200);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["ada@example.com"]);

    expect(result.body.token).toEqual(expect.any(String));

    expect(result.body.user).toEqual({
      id: 1,
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "555-123-4567",
      role: "REQUESTER",
    });

    expect(result.body.user.hash_password).toBeUndefined();
    expect(result.body.user.password_reset).toBeUndefined();

    const decodedToken = jwt.verify(result.body.token, "test-secret");

    expect(decodedToken).toMatchObject({
      id: 1,
      email: "ada@example.com",
      role: "REQUESTER",
    });
  });

  test("POST /api/auth/login returns 400 when password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("CorrectPassword123!", 10);

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@example.com",
          phone_number: "555-123-4567",
          role: "REQUESTER",
          hash_password: hashedPassword,
          password_reset: false,
        },
      ],
    });

    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
      password: "WrongPassword123!",
    });

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("incorrect username or password");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["ada@example.com"]);

    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });
  test("POST /api/auth/login returns 400 when email is missing", async () => {
    const result = await request(app).post("/api/auth/login").send({
      password: "Password123!",
    });

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("missing password or email");
    expect(pool.query).toHaveBeenCalledTimes(0);
    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 400 when password is missing", async () => {
    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
    });

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("missing password or email");
    expect(pool.query).toHaveBeenCalledTimes(0);
    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 404 when user is not found", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const result = await request(app).post("/api/auth/login").send({
      email: "missing@example.com",
      password: "Password123!",
    });

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("could not find user");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["missing@example.com"]);

    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 400 when password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("CorrectPassword123!", 10);

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@example.com",
          phone_number: "555-123-4567",
          role: "REQUESTER",
          hash_password: hashedPassword,
          password_reset: false,
        },
      ],
    });

    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
      password: "WrongPassword123!",
    });

    expect(result.status).toBe(400);
    expect(result.body.message).toBe("incorrect username or password");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["ada@example.com"]);

    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 403 when password reset is required", async () => {
    const hashedPassword = await bcrypt.hash("Password123!", 10);

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@example.com",
          phone_number: "555-123-4567",
          role: "REQUESTER",
          hash_password: hashedPassword,
          password_reset: true,
        },
      ],
    });

    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
      password: "Password123!",
    });

    expect(result.status).toBe(403);
    expect(result.body.message).toBe("user must reset password");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["ada@example.com"]);

    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 403 when stored password is [null]", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          first_name: "Ada",
          last_name: "Lovelace",
          email: "ada@example.com",
          phone_number: "555-123-4567",
          role: "REQUESTER",
          hash_password: "[null]",
          password_reset: false,
        },
      ],
    });

    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
      password: "Password123!",
    });

    expect(result.status).toBe(403);
    expect(result.body.message).toBe("user must reset password");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query.mock.calls[0][1]).toEqual(["ada@example.com"]);

    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });

  test("POST /api/auth/login returns 500 when database query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("database down"));

    const result = await request(app).post("/api/auth/login").send({
      email: "ada@example.com",
      password: "Password123!",
    });

    expect(result.status).toBe(500);
    expect(result.body.message).toBe("cant login user");

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result.body.token).toBeUndefined();
    expect(result.body.user).toBeUndefined();
  });
});

describe("/api/auth/me", () => {
  test("GET /api/auth/me 200 when token is fine", async () => {
    const token = jwt.sign(
      { id: 1, email: "ada@example.com", role: "REQUESTER" },
      "test-secret",
    );
    const response = await request(app)
      .get("/api/auth/me")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: 1,
      email: "ada@example.com",
      role: "REQUESTER",
    });
  });
  test("GET /api/auth/me 403 when token is not valid", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set({ Authorization: `Bearer 111111` });
    expect(response.status).toBe(403);
    expect(response.body.user).toBeUndefined();
  });
  test("GET /api/auth/me returns 401 when token is missing", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.user).toBeUndefined();
  });
});
