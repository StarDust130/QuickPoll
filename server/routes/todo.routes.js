import { Router } from "express";

const router = Router();

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todo.controllers.js";

// 📰 Get all todos
router.get("/", getAllTodos);

// 🪛 Create a new todo
router.post("/create", createTodo);

//  Get a specific todo by its ID
router.get("/:id", getTodo);

// Update a specific todo by its ID
router.put("/:id", updateTodo);

// Delete a specific todo by its ID
router.delete("/:id", deleteTodo);

export default router;
