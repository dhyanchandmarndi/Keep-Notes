import express from "express"; // importing express package
import mongoose from "mongoose"; // importing mongoose package
import dotenv from "dotenv"; // importing dotenv file
import Note from "./module/note_nodule.js";
import cors from "cors";

const PORT = 8010;
const app = express(); // creates express application

app.use(express.json()); // to convert raw data into json format
app.use(cors()); // to connect my frontend and backend
dotenv.config(); // making sure that it is required and configured

// required for connecting to MongoDB database
async function startServer() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

app.get("/", (req, res) => {
  res.send("Hello");
});

// Add Note
app.post("/add-note", async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is Required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
    });
    await note.save();

    return res.json({ error: false, message: "Note added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Get all Notes
app.get("/get-all-notes", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.json({
      error: false,
      notes,
      message: "All Notes retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Edit Note
app.put("/edit-note/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    return res.json({ error: false, message: "Note updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//Delete Note
app.delete("/delete-note/:noteId", async (req, res) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({ _id: noteId });

    if (!note) {
      return res.status(404).json({ message: "Note note found" });
    }

    await Note.deleteOne({ _id: noteId });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
