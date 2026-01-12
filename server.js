import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import statsRoutes from "./routes/stats.js";
import kycRoutes from "./routes/kyc.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/kyc", kycRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Failed to connect to the database. Server not started.");
    process.exit(1);
  }
};

startServer();
