import React from "react";
import { Link } from "react-router-dom";

export default function MoodCard({ mood, onDelete }) {
  return (
    <div className="group relative bg-linear-to-br from-white to-purple-50 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 overflow-hidden flex flex-col h-full">

      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -mr-16 -mt-16" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Mood Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🎭</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{mood.name}</h3>
        </div>

        {/* Songs List */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-4 border border-purple-100 flex-1 max-h-32 overflow-y-auto">
  <ul className="space-y-2 text-gray-700">
    {mood.songs.map((s, i) => (
      <li key={i} className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
        <span className="text-sm font-medium">🎵 {s}</span>
      </li>
    ))}
  </ul>
</div>


        {/* Buttons - ALWAYS at bottom */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            to={`/edit/${mood.id}`}
            className="flex-1 px-4 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 text-center"
          >
            ✏️ Edit
          </Link>

          <button
            onClick={() => onDelete(mood.id)}
            className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-sm font-bold transition-all duration-200"
          >
            🗑️
          </button>
        </div>

      </div>
    </div>
  );
}
