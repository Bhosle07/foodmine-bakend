import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/user.module';
import bcrypt from 'bcryptjs';

const router = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

// Seed route for initial users
router.get("/seed", asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Seed is already done");
    return;
  }
  await UserModel.insertMany(sample_users);
  res.send("Seed is done");
}));

// Login route
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send(generateTokenResponse(user)); // Return the user data with the token
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
}));

// Register route
router.post("/register", asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists, please login");
    return;
  }

  // Encrypt the password
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false
  };

  try {
    const dbUser = await UserModel.create(newUser);
    const response = generateTokenResponse(dbUser); // Generate token after user is created
    console.log("Generated Token:", response.token); // Log the token for debugging
    res.status(201).send(response); // Return user data along with token
  } catch (error) {
    console.error("Error creating user:", error); // Log any errors
    res.status(500).send({ message: "Failed to register user" });
  }
}));

// Function to generate the JWT token and return user data
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { id:user.id ,email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET_KEY! , // Use a more secure key in production
    { expiresIn: "30d" }
  );
  // Ensure the token is added to the response object
  return { ...user.toObject(), token  }; // Return user data along with token
};

export default router;
