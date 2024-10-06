import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      unique: true,
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
    },
    voted: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Poll = mongoose.model("Poll", pollSchema);
