import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyToken = (req, res, next) => {
  // Token Authorization header se lein
  const authHeader = req.headers.authorization;

  // Check if the token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError("No token provided", 403));
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Token se user ka data extract karke request object me save karen
    next(); // Token valid, agle middleware ko call karein
  } catch (error) {
    return next(new ApiError("Invalid token", 401));
  }
};
