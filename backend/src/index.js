import dotenv from "dotenv"; // importing dotenv file
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config(); // making sure that it is required and configured

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB(); // 1) connect to MongoDB

    app.listen(PORT, () => {
      // 2) start Express server
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
