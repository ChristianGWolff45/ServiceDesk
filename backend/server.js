const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ServiceDesk API is running");
});

app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets/:ticketId/comments", commentRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
