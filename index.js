import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import ApiError from "./utils/ApiError.js";
import dbConnect from "./database/db.js";

dotenv.config();
const app = express();
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoutes);

// Error handling middleware
app.use(ApiError);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
