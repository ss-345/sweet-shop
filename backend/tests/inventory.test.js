import request from "supertest";
import app from "../src/app.js";

async function getToken(user) {
  await request(app).post("/api/auth/register").send(user);
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: user.email, password: user.password });
  return res.body.token;
}

describe("Inventory Routes", () => {
  const admin = {
    name: "Admin",
    email: "admin@shop.com",
    password: "Admin1234",
    role: "admin",
  };
  const user = {
    name: "User",
    email: "user@shop.com",
    password: "User1234",
    role: "user",
  };

  const sweet = { name: "Ladoo", category: "Indian", price: 3, quantity: 5 };

  test("Purchase decreases quantity and cannot go below zero", async () => {
    const token = await getToken(admin);
    const created = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(sweet);
    const id = created.body._id || created.body.id;

    const uToken = await getToken(user);
    const p1 = await request(app)
      .post(`/api/sweets/${id}/purchase`)
      .set("Authorization", `Bearer ${uToken}`)
      .send({ quantity: 2 });
    expect(p1.status).toBe(200);
    expect(p1.body.quantity).toBe(3);

    const p2 = await request(app)
      .post(`/api/sweets/${id}/purchase`)
      .set("Authorization", `Bearer ${uToken}`)
      .send({ quantity: 5 });
    expect(p2.status).toBe(400);
  });

  test("Admin can restock", async () => {
    const token = await getToken(admin);
    const created = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send(sweet);
    const id = created.body._id || created.body.id;
    const r = await request(app)
      .post(`/api/sweets/${id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 10 });
    expect(r.status).toBe(200);
    expect(r.body.quantity).toBe(15);
  });
});
