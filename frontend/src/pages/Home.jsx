/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { API } from "../api";
import MoodCard from "../components/MoodCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [preview, setPreview] = useState({});
  const [spotifyLinks, setSpotifyLinks] = useState({});

const navigate = useNavigate();

useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
}, [navigate]);

async function load() {
    try {
      const res = await API.get("/api/moods");
      setMoods(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
  load();
}, []);


  async function handleDelete(id) {
    if (!confirm("Delete this mood?")) return;
    try {
      await API.delete(`/api/moods${id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchRecommendations(moodName) {
    if (!moodName) {
      setRecommended([]);
      return;
    }
    try {
      const res = await API.get(`/api/moods/recommendation/${moodName}`);
      setRecommended(res.data.recommended);
    } catch (err) {
      console.error(err);
      setRecommended([]);
    }
  }

  function handleSelect(e) {
    const moodName = e.target.value;
    setSelectedMood(moodName);
    fetchRecommendations(moodName);
  }

 
  async function playPreview(songName) {
    try {
      const res = await fetch(
        `http://localhost:5000/spotify/preview?query=${songName}`
      );
      const data = await res.json();


      if (data.preview_url) {
        setPreview(prev => ({
          ...prev,
          [songName]: data.preview_url
        }));
      } else {

        setPreview(prev => ({
          ...prev,
          [songName]: "NO_PREVIEW"
        }));


        if (data.track_id) {
          setSpotifyLinks(prev => ({
            ...prev,
            [songName]: `https://open.spotify.com/track/${data.track_id}`
          }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">

    {/* NAVBAR */}
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-lg border-b border-purple-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
        >
          🎵 Moodify
        </h1>

        <div className="flex gap-6 text-gray-700 font-semibold">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-purple-600 transition-colors px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            Home
          </span>

          <span
            onClick={() => navigate("/add")}
            className="cursor-pointer bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Add Mood
          </span>
        </div>
      </div>
    </nav>

    {/* MAIN CONTENT */}
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        🎧 Mood Dashboard
      </h1>
      <p className="text-center text-gray-600 text-lg mb-12">
        Match your mood with the perfect playlist
      </p>

      {/* MOOD SELECT */}
      {moods.length > 0 && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-12 max-w-2xl mx-auto border border-purple-100">
          <label className="block text-xl font-bold text-gray-800 mb-4 items_flex items-center gap-2">
            ✨ Select a Mood:
          </label>

          <select
            value={selectedMood}
            onChange={handleSelect}
            className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none text-lg font-medium bg-linear-to-r from-white to-purple-50 cursor-pointer transition-all"
          >
            <option value="">-- Choose a mood --</option>
            {moods.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* RECOMMENDED SONGS */}
      {selectedMood && (
        <div className="bg-linear-to-br from-purple-500 to-pink-500 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            ✨ Recommended Songs for "{selectedMood}"
          </h2>

          {recommended.length === 0 ? (
            <p className="text-white/90 text-center text-lg py-8">
              No recommended songs found.
            </p>
          ) : (
            <ul className="space-y-4">
              {recommended.map((song, index) => (
                <li
                  key={index}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300"
                >

                  {/* TOP ROW */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-lg font-semibold flex items-center gap-2">
                      🎵 {song}
                    </span>

                    <button
                      onClick={() => playPreview(song)}
                      className="px-6 py-2.5 bg-white text-purple-600 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold"
                    >
                      ▶️ Play
                    </button>
                  </div>

                  {/* AUDIO PREVIEW */}
                  {preview[song] && preview[song] !== "NO_PREVIEW" && (
                    <audio
                      controls
                      src={preview[song]}
                      className="w-full mt-3 rounded-xl"
                    />
                  )}

                  {/* SPOTIFY LINK */}
                  {preview[song] === "NO_PREVIEW" && (
                    <a
                      href={spotifyLinks[song]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-6 py-3 bg-green-500 text-white text-center rounded-full hover:bg-green-600 hover:shadow-xl transition-all duration-200 font-bold"
                    >
                      🎧 Open in Spotify
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ALL MOODS */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🎭 All Moods
      </h2>

      {moods.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎵</span>
          </div>
          <p className="text-xl text-gray-600 mb-6">No moods yet — add one to get started!</p>
          <button 
            onClick={() => navigate("/add")}
            className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
          >
            ➕ Create Your First Mood
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {moods.map((m) => (
      <MoodCard key={m.id} mood={m} onDelete={handleDelete} />
    ))}
  </div>
      )}
    </div>
  </div>
);
}