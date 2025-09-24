import React, { useEffect, useState } from "react";
import NoteCard from "../component/NoteCard";
import Dialog from "../component/Dialog";
import axios from "axios";

const Notes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-notes`
      );
      console.log("Notes API Response:", response.data);
      console.log("Fetched notes:", response.data.notes);

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-note/` + noteId
      );

      if (response.data && !response.data.error) {
        console.log("Note Deleted Successfully");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  };

  const handleEditNote = (noteData) => {
    setopenAddEditModal({ isShown: true, type: "edit", data: noteData });
  };

  useEffect(() => {
    getAllNotes();
    return () => {};
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="mb-4 font-poppins font-bold text-4xl text-black dark:text-white">
          Keep Notes
        </h1>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700  text-white border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
            onClick={() => {
              setopenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            Add Note
          </button>
          <button
            id="theme-toggle-btn"
            className="bg-blue-600 hover:bg-blue-700  border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear ml-4 hover:scale-[1.02]"
            onClick={toggleDarkMode}
          >
            🌙
          </button>
        </div>
      </header>

      {/* Rendering all Notes */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
        {allNotes.map((item, index) => (
          <NoteCard
            key={item._id}
            title={item.title}
            content={item.content}
            onDelete={() => deleteNote(item._id)}
            onEdit={() => handleEditNote(item)}
          />
        ))}
      </div>

      {openAddEditModal.isShown && (
        <Dialog
          onClose={() => {
            setopenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      )}
      {}
    </>
  );
};

export default Notes;
