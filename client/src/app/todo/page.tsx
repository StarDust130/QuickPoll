/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

// 📝 Todo type definition
interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

// 🚀 Fetch all todos
const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get("/api/v1/todo");
  return data;
};

// ✏️ Create a new todo
const createTodo = async (todo: Omit<Todo, "_id">): Promise<Todo> => {
  const { data } = await axios.post("/api/v1/todo/create", todo);
  return data;
};

// 🗑️ Delete a todo
const deleteTodo = async (id: string) => {
  await axios.delete(`/api/v1/todo/${id}`);
};

// 🔄 Update a todo
const updateTodo = async (id: string, updates: Partial<Todo>) => {
  await axios.put(`/api/v1/todo/${id}`, updates);
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⏬ Fetch todos on component mount
  useEffect(() => {
    (async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error: any) {
        setError(`"Failed to load todos" ${error.message}`);
      }
    })();
  }, []);

  // ➕ Handle form submission for adding a new todo
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newTodo = { title, description, completed };

    try {
      // ➕ Create a new todo
      await createTodo(newTodo);

      // 🧹 Clear the input fields
      setTitle("");
      setDescription("");
      setCompleted(false);

      // 🔄 Fetch the updated list of todos
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle toggling completion of a todo
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id, { completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  // 🗑️ Handle deleting a todo
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove deleted todo
    } catch {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* 🌟 Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Todo App 🚀</h1>

      {/* ➕ Todo creation form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          required
        />
        <textarea
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

      {/* 📝 Todo list */}
      <ul className="mt-8 w-full max-w-md space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo._id}
              className={`p-4 flex justify-between items-center bg-white border rounded-lg ${
                todo.completed ? "line-through text-gray-500" : "text-gray-700"
              }`}
            >
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">{todo.title}</h3>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(todo._id, todo.completed)}
                >
                  <CircleCheckBig
                    className={`text-${todo.completed ? "gray" : "green"}-500`}
                  />
                </button>
                <button onClick={() => handleDelete(todo._id)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No todos available.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
