import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

// 🟢 Signup controller (register a new user)
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 🔒 Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🌟 Creating a new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // 💾 Save user to the database
    await newUser.save();

    // 🌈 Success response
    res.status(201).json({
      message: "User created successfully 🎉",
      user: { username: newUser.username, email: newUser.email }, // 🔒 Avoid sending password in response
    });
  } catch (error) {
    // 🛑 Error handling
    res.status(500).json({
      message: "Error creating user ❌",
      error: error.message, // 💡 Provide useful error details
    });
  }
};

// 🟡 Login controller (authenticate user)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // ⚠️ If user not found
      return res.status(401).json({ message: "Invalid credentials 🚫" });
    }

    // 🔑 Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // ⚠️ If password does not match
      return res.status(401).json({ message: "Invalid credentials 🚫" });
    }

    // 🌟 Success response
    res.status(200).json({
      message: "Login successful 🎉",
      user: { username: user.username, email: user.email }, // 🔒 Exclude password
    });
  } catch (error) {
    // 🛑 Error handling
    res.status(500).json({
      message: "Error logging in ❌",
      error: error.message,
    });
  }
};

export { signup, login };
