import { Todo } from "../models/todo.models.js";


// 📰 Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Retrieve all todos from the database
    res.json(todos); // Respond with the list of todos
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

// 🪛 Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body; // Get title and description from the request body

    // 🌟 Create a new todo with the provided data
    const todo = new Todo({
      title,
      description,
      completed,
    });

    // 💾 Save the new todo to the database
    await todo.save();

    // ✅ Respond with the created todo
    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};


export { createTodo, getAllTodos };