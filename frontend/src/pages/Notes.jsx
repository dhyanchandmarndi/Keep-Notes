import React, { useEffect, useState, useContext } from "react";
import NoteCard from "../components/NoteCard";
import Dialog from "../components/Dialog";
import { fetchAllNotes, removeNote } from "../services/notes";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAllNotes = async () => {
    try {
      const response = await fetchAllNotes();
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.error(error);
      console.log("An unexpected error occured. Please try again.");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await removeNote(noteId);
      if (response.data && !response.data.error) {
        console.log("Note Deleted Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.error(error);
      console.log("An unexpected error occured. Please try again.");
    }
  };

  const handleEditNote = (noteData) => {
    setopenAddEditModal({ isShown: true, type: "edit", data: noteData });
  };

  useEffect(() => {
    getAllNotes();
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="mb-4 font-poppins font-bold text-4xl text-black dark:text-white">
          Keep Notes
        </h1>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-black dark:text-white font-medium">
              Hi, {user.name || user.email}
            </span>
          )}

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
            onClick={() => {
              setopenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            Add Note
          </button>

          <button
            id="theme-toggle-btn"
            className="bg-blue-600 hover:bg-blue-700 border-none py-3 px-4 rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
            onClick={toggleDarkMode}
          >
            🌙
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white border-none py-3 px-4 rounded-lg cursor-pointer font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Rendering all Notes */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
        {allNotes.map((item) => (
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
    </>
  );
};

export default Notes;
