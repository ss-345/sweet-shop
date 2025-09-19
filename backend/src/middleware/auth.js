import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.substring(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function authorize(roles = []) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (allowed.length && !allowed.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
