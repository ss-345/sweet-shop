import dotenv from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default startServer;
