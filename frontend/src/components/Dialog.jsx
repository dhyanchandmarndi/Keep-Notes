// src/components/Dialog.jsx
import React, { useState } from "react";
import { createNote, updateNote } from "../services/notes";

const Dialog = ({ noteData, onClose, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState("");

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await createNote({ title, content });

      // backend currently doesn't return note object, so we just check error flag
      if (response.data && !response.data.error) {
        console.log("Note added successfully");
        if (getAllNotes) {
          await getAllNotes();
        }
        onClose();
      } else {
        setError(response.data?.message || "Failed to add note");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await updateNote(noteId, { title, content });

      if (response.data && !response.data.error) {
        console.log("Note updated successfully");
        if (getAllNotes) {
          await getAllNotes();
        }
        onClose();
      } else {
        setError(response.data?.message || "Failed to update note");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // ✅ prevent full page reload
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div
      id="noteDialog"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000 border-none rounded-lg p-0 bg-white dark:bg-gray-800 text-black dark:text-white w-screen max-w-lg"
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold" id="dialogTitle">
            {type === "edit" ? "Update Note" : "Add New Note"}
          </h2>
          <button
            className="border-none text-2xl cursor-pointer text-black dark:text-white p-1 rounded-lg transition-background "
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form id="noteForm" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="noteTitle"
              className="mb-3 block font-medium text-black dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="noteTitle"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-gray-100 transition-colors duration-200 ease-linear focus:outline-none focus:border-blue-600 dark:focus:border-blue-700"
              placeholder="Enter note title.."
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="noteContent"
              className="mb-3 block font-medium text-black dark:text-white"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-gray-100 transition-colors duration-200 ease-linear focus:outline-none focus:border-blue-600 dark:focus:border-blue-700 resize-y min-h-[120px]"
              placeholder="Write your note here.."
              id="noteContent"
              value={content}
              onChange={({ target }) => setContent(target.value)}
              required
            ></textarea>
          </div>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700  px-6 py-3 text-white rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700  px-6 py-3 rounded-lg text-white cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
            >
              {type === "edit" ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
