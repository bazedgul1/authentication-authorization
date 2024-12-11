import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return next(new ApiError("All fields are required", 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError("Email and password are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export const protectedRoute = (req, res) => {
  const { role } = req.user;
  if (role === "admin") {
    return res.json({ message: "Hello Admin" });
  } else if (role === "user") {
    return res.json({ message: "Hello User" });
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};


export const unprotectedRoute = (req, res) => {
  res.json({ message: "This route is unprotected" });
};
