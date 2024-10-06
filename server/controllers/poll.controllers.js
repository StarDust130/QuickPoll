import { Poll } from "../models/poll.models.js";

// 🚀 Create a new poll
const createPoll = async (req, res) => {
  try {
    const { question, options, userId } = req.body;

    // 🟡 Check if options are valid
    if (!options || options.length < 2) {
      return res.status(400).json({
        message: "At least two options are required ⚠️",
      });
    }

    // 🟢 Create poll
    const poll = new Poll({
      question,
      options,
      createdBy: userId,
    });

    // 💾 Save poll to the database
    await poll.save();

    // 🌟 Success response
    return res.status(201).json({
      message: "Poll created successfully 🚀",
      poll,
    });
  } catch (error) {
    // 🛑 Handle errors gracefully
    if (error.code === 11000) {
      // Handle unique constraint error (e.g., question already exists)
      return res.status(409).json({
        message: "A poll with this question already exists ⚠️",
      });
    }
    return res.status(500).json({
      message: "An error occurred while creating the poll ❌",
      error: error.message,
    });
  }
};

// Get poll details
const getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.json(poll);
};

// Vote on a poll
const votePoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  const { optionIndex } = req.body;
  poll.options[optionIndex].votes += 1;
  await poll.save();
  res.json(poll);
};

export { createPoll, getPoll, votePoll };
