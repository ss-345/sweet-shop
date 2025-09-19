import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectToDatabase, disconnectFromDatabase } from "../config/db.js";
import Sweet from "../models/Sweet.js";

dotenv.config();

async function run() {
  try {
    await connectToDatabase();
    await Sweet.deleteMany({});
    const items = [
      { name: "Gulab Jamun", category: "Indian", price: 5, quantity: 20 },
      { name: "Rasgulla", category: "Indian", price: 4, quantity: 15 },
      { name: "Barfi", category: "Indian", price: 6, quantity: 12 },
      { name: "Jalebi", category: "Indian", price: 3, quantity: 25 },
    ];
    await Sweet.insertMany(items);
    // eslint-disable-next-line no-console
    console.log("Seeded sweets: ", items.length);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    await mongoose.connection.close();
  }
}

run();
