// app.js
import express from "express";
import cors from "cors";
import notesRouter from "./routes/note.routes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());

// health/basic route
app.get("/", (req, res) => {
  res.send("Note App API is running");
});

// attach note routes
app.use("/", notesRouter);

// ⬇️ 404 handler (for unknown routes)
app.use(notFound);

// ⬇️ central error handler (for any errors passed with next(err))
app.use(errorHandler);

export default app;
