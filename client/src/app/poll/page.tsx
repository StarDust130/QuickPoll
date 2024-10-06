"use client";
import { useState, useEffect, FormEvent } from "react";

// Define the Todo type
interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Fetch all todos from the API
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("http://localhost:3000/api/v1/todo");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await response.json();
};

// Create a new todo via the API
const createTodo = async (todoData: Omit<Todo, "_id">): Promise<Todo> => {
  const response = await fetch("http://localhost:3000/api/v1/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return await response.json();
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to hold the list of todos
  const [title, setTitle] = useState<string>(""); // State to hold the title input
  const [description, setDescription] = useState<string>(""); // State to hold the description input
  const [completed, setCompleted] = useState<boolean>(false); // State to hold the completed input
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchAndSetTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAndSetTodos();
  }, []);

  // Handle form submission to create a new todo
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newTodo = { title, description, completed };
    try {
      await createTodo(newTodo);
      setTitle("");
      setDescription("");
      setCompleted(false);

      // Refresh the todo list after creating a new one
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Main container */}
      <div className="flex flex-1 items-start justify-center space-x-8">
        {/* Left side: Form to create a new todo */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Create a New Todo
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Todo title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Todo description"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="mr-2 focus:ring-0 focus:border-blue-300"
              />
              <label className="text-sm font-medium text-gray-700">
                Mark as Completed
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Add Todo
            </button>
          </form>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        {/* Right side: Display the list of todos */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-green-600">All Todos</h2>
          <ul className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`p-4 border rounded-lg ${
                    todo.completed ? "bg-green-100" : "bg-yellow-100"
                  } shadow-md`}
                >
                  <h3 className="text-xl font-semibold">{todo.title}</h3>
                  <p className="text-gray-700">{todo.description}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-bold">
                      {todo.completed ? "Completed" : "Not Completed"}
                    </span>
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No todos available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
