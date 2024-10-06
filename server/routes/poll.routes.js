import express from "express";

const router = express.Router();
import {createPoll , getPoll ,votePoll } from "../controllers/poll.controllers.js";

// Create poll
router.post("/create", createPoll);

// Get a poll
router.get("/:id", getPoll);

// Vote on a poll  
router.post("/:id/vote", votePoll);

export default router;