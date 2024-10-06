import express from "express";
import {
  createPoll,
  getAllPolls,
  getPoll,
  votePoll,
} from "../controllers/poll.controllers.js";

const router = express.Router();

// 📝 Create a new poll
router.post("/create", createPoll);

// 📋 Get a specific poll by its ID
router.get("/:id", getPoll);

// 🗳️ Vote on a specific poll
router.post("/:id/vote", votePoll);

// All Polls

router.get("/", getAllPolls);

export default router;
