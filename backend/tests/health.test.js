jest.mock("../db", () => ({
  query: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");

describe("health routes", () => {
  test("GET / returns API status text", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.text).toContain("ServiceDesk API is running");
  });
});
