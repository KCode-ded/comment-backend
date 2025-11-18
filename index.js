const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://kaushikscs588452_db_user:AvdIauNWGFSTxHWk@cine-hub.9ppb8fb.mongodb.net/?appName=cine-hub")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Comment Schema
const CommentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    timestamp: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", CommentSchema);

// POST: Add comment
app.post("/comment", async (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) return res.json({ error: "Missing fields" });

    const newComment = new Comment({ username, comment });
    await newComment.save();

    res.json({ success: true });
});

// GET: Fetch all comments
app.get("/comments", async (req, res) => {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
});

app.listen(3000, () => console.log("Server running on 3000"));
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
