import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5001;

// 🔥 Global crash handlers
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:");
  console.error(err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
});

// 🔥 Debug logs before starting server
console.log(process.env.DATABASE_URL);
console.log("🚀 Starting server...");
console.log("📌 PORT:", PORT);
console.log("📌 NODE_ENV:", process.env.NODE_ENV);
console.log("📌 Time:", new Date().toISOString());

// 🔥 Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// 🔥 Detect server-level errors
server.on("error", (err) => {
  console.error("💥 Server error:", err);
});

// 🔥 Optional: log when server closes
server.on("close", () => {
  console.warn("⚠️ Server closed");
});