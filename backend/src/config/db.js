import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  const mongoUri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sweet_shop";
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || undefined,
  });
  isConnected = true;
  console.log("Connected to MongoDB");
}

export async function disconnectFromDatabase() {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
}
