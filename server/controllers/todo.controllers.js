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

// 📝 Update a todo by ID
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get the todo ID from the URL
    const { title, description, completed } = req.body; // Get updated data from the request body

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    ); // Find the todo by ID and update it with the new data

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" }); // Todo not found
    }

    res.json(todo); // Respond with the updated todo
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

// 🗑️ Delete a todo by ID
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get the todo ID from the URL

    const todo = await Todo.findByIdAndDelete(id); // Find the todo by ID and delete it

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" }); // Todo not found
    }

    res.json({ message: "Todo deleted successfully" }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

// 📋 Get todo details by ID
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Find the todo by its ID

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" }); // Todo not found
    }

    res.json(todo); // Respond with the todo details
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
};

export { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo };
