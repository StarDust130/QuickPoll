import { Poll } from "../models/poll.models.js"; 

// 📝 Create a new poll
const createPoll = async (req, res) => {
  try {
    const { question, options, createdBy } = req.body;

    // 🌟 Create a new poll with the provided data
    const poll = new Poll({ question, options, createdBy });

    // 💾 Save the new poll to the database
    await poll.save();

    // ✅ Respond with the created poll
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    // ⚠️ Handle any errors during poll creation
    res.status(500).json({ message: "Error creating poll", error });
  }
};

// 📋 Get poll details by ID
const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id); // Find the poll by its ID

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" }); // Poll not found
    }

    // ✅ Return the poll details
    res.json(poll);
  } catch (error) {
    // ⚠️ Handle errors (e.g., invalid ID format)
    res.status(500).json({ message: "Error fetching poll", error });
  }
};

// 🗳️ Vote on a poll
const votePoll = async (req, res) => {
  try {
    const { id } = req.params; // Poll ID from the URL
    const { optionIndex, userId } = req.body; // Option index and user ID from the request body

    const poll = await Poll.findById(id); // Find the poll by ID

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" }); // Poll not found
    }

    if (poll.voted.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already voted on this poll" }); // Prevent duplicate votes
    }

    // 🌟 Increment the vote count for the selected option
    poll.options[optionIndex].votes += 1;

    // 🗳️ Add the user to the voted array to prevent duplicate votes
    poll.voted.push(userId);

    // 💾 Save the updated poll to the database
    await poll.save();

    // ✅ Respond with the updated poll
    res.json(poll);
  } catch (error) {
    // ⚠️ Handle any errors during voting
    res.status(500).json({ message: "Error voting on poll", error });
  }
};

// 📋 Get all polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find(); // Fetch all polls from the database

    // ✅ Respond with the fetched polls
    res.json(polls);
  } catch (error) {
    // ⚠️ Handle any errors during fetching polls
    res.status(500).json({ message: "Error fetching polls", error });
  }
};

export { createPoll, getPoll, votePoll, getAllPolls };
