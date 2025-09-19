import request from "supertest";
import app from "../src/app.js";

async function registerAndLogin(user) {
  await request(app).post("/api/auth/register").send(user);
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: user.email, password: user.password });
  return res.body.token;
}

describe("Sweets Routes", () => {
  const admin = {
    name: "Admin",
    email: "admin@sweets.com",
    password: "Admin1234",
    role: "admin",
  };
  const user = {
    name: "Bob",
    email: "bob@sweets.com",
    password: "User1234",
    role: "user",
  };

  const demoSweet = {
    name: "Gulab Jamun",
    category: "Indian",
    price: 5,
    quantity: 10,
  };

  test("GET /api/sweets should list sweets (initially empty)", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Admin can add a sweet", async () => {
    const token = await registerAndLogin(admin);
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(demoSweet);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(demoSweet.name);
  });

  test("User cannot add a sweet", async () => {
    const token = await registerAndLogin(user);
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(demoSweet);
    expect(res.status).toBe(403);
  });

  test("Search sweets by name and price range", async () => {
    const token = await registerAndLogin(admin);
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(demoSweet);
    const res = await request(app)
      .get("/api/sweets/search")
      .query({ name: "Gulab", priceMin: 1, priceMax: 10 });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("Admin can update and delete a sweet", async () => {
    const token = await registerAndLogin(admin);
    const created = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(demoSweet);
    const id = created.body._id || created.body.id;
    const up = await request(app)
      .put(`/api/sweets/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 6 });
    expect(up.status).toBe(200);
    expect(up.body.price).toBe(6);
    const del = await request(app)
      .delete(`/api/sweets/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(204);
  });
});
