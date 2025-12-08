// app.js
import express from "express";
import cors from "cors";
import notesRouter from "./routes/note.routes.js";
import authRouter from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { auth } from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cors());

// health/basic route
app.get("/", (req, res) => {
  res.send("Note App API is running");
});

// Auth routes (public)
app.use("/auth", authRouter);

// Note routes (protected)
app.use("/", auth, notesRouter);
// now /add-note, /get-all-notes, etc require a valid token

app.use(notFound);
app.use(errorHandler);

export default app;
