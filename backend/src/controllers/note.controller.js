// controllers/note.controller.js
import Note from "../models/note.model.js";

// ➕ Add Note
export const addNote = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const note = new Note({ title, content });
    await note.save();

    return res.json({ error: false, message: "Note added successfully" });
  } catch (error) {
    next(error); // pass to central error handler
  }
};

// 📄 Get all Notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    return res.json({
      error: false,
      notes,
      message: "All Notes retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ✏️ Edit Note
export const editNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    return res.json({ error: false, message: "Note updated successfully" });
  } catch (error) {
    next(error);
  }
};

// 🗑 Delete Note
export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
