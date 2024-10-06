import express from "express";

const router = express.Router();
const {
  createPoll,
  getPoll,
  votePoll,
} = require("../controllers/pollController");

// Create poll
router.post("/create", createPoll);

// Get a poll
router.get("/:id", getPoll);

// Vote on a poll
router.post("/:id/vote", votePoll);

module.exports = router;
