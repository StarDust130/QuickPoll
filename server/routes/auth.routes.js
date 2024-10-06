import express from "express";

const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

module.exports = router;
