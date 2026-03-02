require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const router = require("./Routes/Index");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", router);

// Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));