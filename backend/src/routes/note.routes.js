// routes/note.routes.js
import express from "express";
import {
  addNote,
  getAllNotes,
  editNote,
  deleteNote,
} from "../controllers/note.controller.js";

import {
  validateCreateNote,
  validateUpdateNote,
} from "../middlewares/validateNote.js";

const router = express.Router();

// Add Note
router.post("/add-note", validateCreateNote, addNote);

// Get all Notes
router.get("/get-all-notes", getAllNotes);

// Edit Note
router.put("/edit-note/:noteId", validateUpdateNote, editNote);

// Delete Note
router.delete("/delete-note/:noteId", deleteNote);

export default router;
