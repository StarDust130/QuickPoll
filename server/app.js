import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express(); // Create an Express app

//! Common Middleware

//? Allow CORS for all routes in the app
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//? Parse cookies from the request headers
// app.use(cookieParser());

//? We can accept JSON in the body of the request
app.use(express.json({ limit: "16kb" }));

//? Allow URL encoded data in the body of the request
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//? Serve static files from the public directory
app.use(express.static("public"));

//! import Routes
import authRoutes from "./routes/auth.routes.js";
import pollRoutes from "./routes/poll.routes.js";

//! All Routes
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/poll", pollRoutes);

//! Error Handler
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({
//     success: false,
//     message: err.message || "Something went wrong 😞",
//   });
// });

export { app };
