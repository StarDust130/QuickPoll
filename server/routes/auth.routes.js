import { Router } from "express";
const router = Router();

import { signup, login } from "../controllers/auth.controllers.js";

// Signup
router.route("/signup").post(signup);

// Login
router.route("/login").post(login);

export default router;
