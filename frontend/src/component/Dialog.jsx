import React, { useEffect, useState } from "react";
import axios from "axios";

const Dialog = ({ noteData, onClose, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-note`,
        {
          title,
          content,
        }
      );

      if (response.data && response.data.note) {
        console.log("Note added successfully:", response.data.note);
        console.log("Calling getAllNotes...");
        if (getAllNotes) {
          await getAllNotes();
          console.log("getAllNotes completed");
        }
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/edit-note/` + noteId,
        {
          title,
          content,
        }
      );

      if (response.data && response.data.note) {
        console.log("Note updated successfully:", response.data.note);
        console.log("Calling getAllNotes...");
        if (getAllNotes) {
          await getAllNotes();
          console.log("getAllNotes completed");
        }
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // Handle the form submission here
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
              onChange={({ target }) => {
                setTitle(target.value);
              }}
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
