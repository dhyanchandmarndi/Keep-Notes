// controllers/note.controller.js
import Note from "../models/note.model.js";

// Add Note
export const addNote = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user.id, // 👈 owner
    });
    await note.save();

    return res.json({ error: false, message: "Note added successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all Notes (only for logged-in user)
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json({
      error: false,
      notes,
      message: "All Notes retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Edit Note (only if note belongs to user)
export const editNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, user: req.user.id });

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

// Delete Note (only if owned)
export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({ _id: noteId, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
