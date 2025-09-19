import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {
  const user = {
    name: "Alice",
    email: "alice@example.com",
    password: "Password123",
    role: "user",
  };
  const admin = {
    name: "Admin",
    email: "admin@example.com",
    password: "AdminPass123",
    role: "admin",
  };

  test("POST /api/auth/register should register a new user and return JWT", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(user.email);
  });

  test("POST /api/auth/login should login and return JWT", async () => {
    await request(app).post("/api/auth/register").send(admin);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: admin.email, password: admin.password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.role).toBe("admin");
  });

  test("POST /api/auth/login should fail with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nope@example.com", password: "wrong" });
    expect(res.status).toBe(401);
  });
});
