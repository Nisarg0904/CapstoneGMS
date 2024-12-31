const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");

// Signup Route (routes/userRoutes.js)
router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, email, password, addDetailsLater } =
    req.body;

  try {
    // Check if the user already exists by email or username
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Create a new user without manually hashing the password
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.errors
        ? err.errors[0].message
        : "Server error during signup",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { input, password } = req.body; // Accept input (username or email) and password

  try {
    // Check if the input is an email or a username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    const user = isEmail
      ? await User.findOne({ where: { email: input } })
      : await User.findOne({ where: { username: input } });

    // If no user is found, respond with an error message
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist with given Username or Email" });
    }

    // Compare provided password with stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token and user details
    res.header("Authorization", `Bearer ${token}`).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

// Edit User Route
router.put("/edit", authenticateToken, async (req, res) => {
  const {
    shoppingActivity,
    dietPreference,
    cookingForPeople,
    cuisinePreference,
  } = req.body;

  try {
    // Update user details for authenticated user
    const [updated] = await User.update(
      { shoppingActivity, dietPreference, cookingForPeople, cuisinePreference },
      { where: { id: req.user.id } }
    );

    if (updated) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.errors
        ? err.errors[0].message
        : "Server error during user update",
    });
  }
});

// Delete User Route
router.delete("/delete", authenticateToken, async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.user.id } });
    if (deleted) {
      res.status(200).json({ message: "User account deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.errors
        ? err.errors[0].message
        : "Server error during user deletion",
    });
  }
});

// Get User Info Route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Find user by the authenticated user ID
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      shoppingActivity: user.shoppingActivity,
      dietPreference: user.dietPreference,
      cookingForPeople: user.cookingForPeople,
      cuisinePreference: user.cuisinePreference,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
});

// Get User by ID Route
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from the route parameter

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user details
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      shoppingActivity: user.shoppingActivity,
      dietPreference: user.dietPreference,
      cookingForPeople: user.cookingForPeople,
      cuisinePreference: user.cuisinePreference,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error while fetching user details",
    });
  }
});

module.exports = router;
