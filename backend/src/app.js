import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Placeholder routes (to be implemented in TDD Green phase)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweets.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
