const app = require("../app");
const request = require("supertest");
const pool = require("../db");
const jwt = require("jsonwebtoken");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

const categories = [{ id: 1, name: "Wifi/Network" }];

const users = [
  { id: 1, email: "requester@email.com", role: "REQUESTER" },
  { id: 2, email: "AGENT@email.com", role: "AGENT" },
  { id: 3, email: "ADMIN@email.com", role: "ADMIN" },
];

describe("GET /api/categories ", () => {
  beforeEach(() => pool.query.mockReset());
  test("Requesters are able to get all the categories", async () => {
    const token = jwt.sign(users[0], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: categories });
    const response = await request(app)
      .get("/api/categories")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(categories);
  });
  test("AGENTS are able to get all the categories", async () => {
    const token = jwt.sign(users[1], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: categories });
    const response = await request(app)
      .get("/api/categories")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(categories);
  });
  test("ADMINS are able to get all the categories", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: categories });
    const response = await request(app)
      .get("/api/categories")
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(categories);
  });
  test("Unauthenticated users cannot access categories", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(401);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
});

describe("PATCH /api/categories/:categoryId", () => {
  //Unauthenticated cannot update categories
  test("unauthenticated user cannot update categories", async () => {
    const response = await request(app).patch("/api/categories/1");
    expect(response.status).toBe(401);
  });
  //Requesters cannot update categories
  test("REQUESTERS cannot update categories", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .patch("/api/categories/1")
      .send({ category: "UPDATED" })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(403);
  });
  //Agents cannot update categories
  test("AGENTS cannot update categories", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .patch("/api/categories/1")
      .send({ category: "UPDATED" })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(403);
  });
  //ADMIN can update categories
  test("REQUESTERS cannot update categories", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({ rows: [categories[0]] });
    const response = await request(app)
      .patch("/api/categories/1")
      .send({ category: "UPDATED" })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(categories[0]);
  });
});

describe("POST /api/categories", () => {
  beforeEach(() => pool.query.mockReset());
  // unauthenticated cannot create category
  test("unauthenticated user cannot create category", async () => {
    const response = await request(app).post("/api/categories");
    expect(response.status).toBe(401);
  });
  // requester cannot create category
  test("REQUESTER cannot create category", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .post("/api/categories")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  // agent cannot create category
  test("AGENT cannot create category", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .post("/api/categories")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });
  // admin can create category
  test("ADMIN can create category", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 2, category: "new category" }],
    });
    const response = await request(app)
      .post("/api/categories")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(201);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

describe("DELETE /api/categories/1", () => {
  beforeEach(() => pool.query.mockReset());

  test("unauthenticated user cannot delete category", async () => {
    const response = await request(app).delete("/api/categories/1");
    expect(response.status).toBe(401);
  });

  test("REQUESTER cannot delete category", async () => {
    const token = jwt.sign(users[0], "test-secret");
    const response = await request(app)
      .delete("/api/categories/1")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });

  test("AGENT cannot delete category", async () => {
    const token = jwt.sign(users[1], "test-secret");
    const response = await request(app)
      .delete("/api/categories/1")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(403);
    expect(pool.query).toHaveBeenCalledTimes(0);
  });

  test("ADMIN can delete category", async () => {
    const token = jwt.sign(users[2], "test-secret");
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 2, category: "new category" }],
    });
    const response = await request(app)
      .delete("/api/categories/1")
      .set({ authorization: `Bearer ${token}` })
      .send({ category: "new category" });
    expect(response.status).toBe(200);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});
