import express from "express";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 middleware: тільки адмін
function adminOnly(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// === GET ALL ===
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// === CREATE ===
router.post("/", adminOnly, async (req, res) => {
  const { title, price, image } = req.body;

  const product = await Product.create({ title, price, image });
  res.json({ message: "Product added", product });
});

// === UPDATE ===
router.put("/:id", adminOnly, async (req, res) => {
  const { id } = req.params;
  const { title, price, image } = req.body;

  const updated = await Product.findByIdAndUpdate(
    id,
    { title, price, image },
    { new: true }
  );

  res.json({ message: "Product updated", updated });
});

// === DELETE ===
router.delete("/:id", adminOnly, async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
});

export default router;