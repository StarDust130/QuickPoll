import mongoose from "mongoose";

// 📝 Poll Schema Definition
const pollSchema = new mongoose.Schema(
  {
    // 🟡 Question field (required and unique)
    question: {
      type: String,
      required: [true, "Question is required"],
      unique: true,
    },
    // 🟢 Options field (array of strings)
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: [arrayLimit, "{PATH} must have at least 2 options"], // ✅ Validate minimum options length
    },
    // 🔵 Voted users (array of user IDs)
    voted: {
      type: [String],
      default: [],
    },
    // 🟠 Creator of the poll (reference to User)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // ⏰ Auto timestamps (createdAt, updatedAt)
);

// Custom validator to ensure at least 2 options
function arrayLimit(val) {
  return val.length >= 2;
}

// 🔥 Poll model
export const Poll = mongoose.model("Poll", pollSchema);
