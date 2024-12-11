import express from "express";
import {
  registerUser,
  loginUser,
  protectedRoute,
  unprotectedRoute,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/unprotected", unprotectedRoute);
authRouter.get("/protected", verifyToken, protectedRoute);



export default authRouter;