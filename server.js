 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./usermodel");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/myreactdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// POST API to save user
app.post("/api/save-user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// GET API to fetch users (optional)
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
