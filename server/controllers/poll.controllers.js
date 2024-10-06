import { Poll } from "../models/poll.models.js";

// Create a poll
const createPoll = async (req, res) => {
  const { question, options, userId } = req.body;
  const poll = new Poll({
    question,
    options: options.map((option) => ({ text: option })),
    createdBy: userId,
  });
  await poll.save();
  res.status(201).json(poll);
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