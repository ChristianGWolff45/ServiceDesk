const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const locationRoutes = require("./routes/locationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");

const pool = require("./db");

const app = express();

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ServiceDesk API is running");
});

app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets/:ticketId/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
