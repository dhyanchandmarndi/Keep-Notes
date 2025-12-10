// middlewares/validateNote.js

// Validate note creation (add-note)
export function validateCreateNote(req, res, next) {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  next(); // everything is valid
}

// Validate note update (edit-note)
export function validateUpdateNote(req, res, next) {
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({
      error: true,
      message: "Provide at least one field to update",
    });
  }

  next();
}
