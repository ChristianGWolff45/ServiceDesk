const app = require("../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const pool = require("../db");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

const locations = [
  { id: 1, name: "Beatty Center" },
  { id: 2, name: "Swearingen Engineering Center" },
  { id: 3, name: "Thomas Cooper Library" },
];

const users = [
  { id: 1, email: "requester@email.com", role: "REQUESTER" },
  { id: 2, email: "AGENT@email.com", role: "AGENT" },
  { id: 3, email: "ADMIN@email.com", role: "ADMIN" },
];

describe("GET /api/locations ", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  test("REQUESTER can access all locations", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: locations });
    const response = await request(app)
      .get("/api/locations")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(locations);
    expect(response.body).toHaveLength(3);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
  test("UNAUTHENTICATED user cannot access locations", async () => {
    const response = await request(app).get("/api/locations");
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("AGENT can access all locations", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: locations });
    const response = await request(app)
      .get("/api/locations")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(locations);
    expect(response.body).toHaveLength(3);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
  test("ADMIN can access all locations", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: locations });
    const response = await request(app)
      .get("/api/locations")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(locations);
    expect(response.body).toHaveLength(3);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe("PATCH /api/locations/:locationId ", () => {
  test("UNAUTHENTICATED user cannot update location", async () => {
    const response = await request(app)
      .patch("/api/locations/1")
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("REQUESTER cannot update location", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .patch("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("AGENT cannot update location", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .patch("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("ADMIN can update location", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, location: "Beatty Center 2" }],
    });
    const response = await request(app)
      .patch("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ location: "Beatty Center 2" });

    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ id: 1, location: "Beatty Center 2" });
  });
});

describe("DELETE /api/locations/:locationId", () => {
  test("UNAUTHENTICATED user cannot delete location", async () => {
    const response = await request(app)
      .delete("/api/locations/1")
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("REQUESTER cannot delete location", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .delete("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("AGENT cannot delete location", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .delete("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("ADMIN can delete location", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, location: "Beatty Center 2" }],
    });
    const response = await request(app)
      .delete("/api/locations/1")
      .set({ Authorization: `Bearer ${token}` })
      .send({ location: "Beatty Center 2" });

    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/locations", () => {
  test("UNAUTHENTICATED user cannot create a location", async () => {
    const response = await request(app)
      .post("/api/locations")
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("REQUESTER cannot create a location", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .post("/api/locations")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("AGENT cannot create a location", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .post("/api/locations")
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: "Beatty Center 2" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  test("ADMIN can create a location", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 4, location: "Beatty Center 2" }],
    });
    const response = await request(app)
      .post("/api/locations")
      .set({ Authorization: `Bearer ${token}` })
      .send({ location: "Beatty Center 2" });

    expect(response.status).toBe(201);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ id: 4, location: "Beatty Center 2" });
  });
});
