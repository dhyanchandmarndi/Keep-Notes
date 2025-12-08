// src/services/notes.js
import API from "./api";

export const fetchAllNotes = () => API.get("/get-all-notes");

export const createNote = (data) => API.post("/add-note", data);

export const updateNote = (id, data) => API.put(`/edit-note/${id}`, data);

export const removeNote = (id) => API.delete(`/delete-note/${id}`);
