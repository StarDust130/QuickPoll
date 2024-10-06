import mongoose from "mongoose";

// 🧑‍💻 User Schema Definition
const userSchema = new mongoose.Schema(
  {
    // 🟡 Username field (required and unique)
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    // 🟢 Email field (required, unique, and trimmed)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true, // 🚨 Removes extra spaces
    },
    // 🔒 Password field (hashed, required)
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true } // ⏰ Auto timestamps for createdAt, updatedAt
);

// 🔥 Exporting User Model
export const User = mongoose.model("User", userSchema);
