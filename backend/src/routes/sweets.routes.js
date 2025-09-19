import express from "express";
import Sweet from "../models/Sweet.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public list
router.get("/", async (req, res) => {
  const sweets = await Sweet.find({}).sort({ createdAt: -1 });
  res.status(200).json(sweets);
});

// Public search
router.get("/search", async (req, res) => {
  const { name, category, priceMin, priceMax } = req.query;
  const query = {};
  if (name) query.name = { $regex: new RegExp(name, "i") };
  if (category) query.category = { $regex: new RegExp(category, "i") };
  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }
  const sweets = await Sweet.find(query).sort({ createdAt: -1 });
  res.status(200).json(sweets);
});

// Admin create
router.post("/", authenticate, authorize(["admin"]), async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const created = await Sweet.create({ name, category, price, quantity });
  res.status(201).json(created.toJSON());
});

// Admin update
router.put("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.status(200).json(updated.toJSON());
});

// Admin delete
router.delete("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const deleted = await Sweet.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
});

// Purchase (any authenticated user)
router.post("/:id/purchase", authenticate, async (req, res) => {
  const qty = Number(req.body.quantity || 1);
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Not found" });
  if (qty <= 0) return res.status(400).json({ message: "Invalid quantity" });
  if (sweet.quantity - qty < 0)
    return res.status(400).json({ message: "Insufficient stock" });
  sweet.quantity -= qty;
  await sweet.save();
  res.status(200).json(sweet.toJSON());
});

// Restock (admin only)
router.post(
  "/:id/restock",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const qty = Number(req.body.quantity || 1);
    if (qty <= 0) return res.status(400).json({ message: "Invalid quantity" });
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Not found" });
    sweet.quantity += qty;
    await sweet.save();
    res.status(200).json(sweet.toJSON());
  }
);

export default router;
