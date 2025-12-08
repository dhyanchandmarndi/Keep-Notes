import React from "react";

const NoteCard = ({ title, content, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 group rounded-lg p-6 border-1 border-solid border-white dark:border-gray-700 transition-all duration-200 ease-linear relative hover:opacity-100 hover:scale-[1.02] shadow-lg dark:shadow-lg">
      <h3 className="text-xl text-black dark:text-white font-semibold mb-3 text-bold wrap-break-word">
        {title}
      </h3>
      <p className="text-black dark:text-white leading-[1.6] mb-4 break-words whitespace-pre-wrap">
        {content}
      </p>
      <div className="absolute hidden group-hover:flex group-hover:opacity-100 top-4 right-4 gap-2 opacity-0 transition-all duration-200 ease-linear">
        <button className="edit-btn" title="Edit Note" onClick={onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#191b23"
          >
            <path d="M184-184v-83.77l497.23-498.77q5.15-5.48 11.07-7.47 5.93-1.99 11.99-1.99 6.06 0 11.62 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 12.25 0 6.13-2.24 12.06-2.24 5.92-7.22 11.07L267.77-184H184Zm505.15-466.46L744-704.54 704.54-744l-54.08 54.85 38.69 38.69Z" />
          </svg>
        </button>

        <button className="delete-btn" title="Delete Note" onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#191b23"
          >
            <path d="M291-267.69 267.69-291l189-189-189-189L291-692.31l189 189 189-189L692.31-669l-189 189 189 189L669-267.69l-189-189-189 189Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
