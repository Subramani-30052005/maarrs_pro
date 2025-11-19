import React, { useState } from 'react'
import { API } from '../api'
import { useNavigate } from 'react-router-dom'

export default function AddMood() {
  const [name, setName] = useState('')
  const [songInput, setSongInput] = useState('')
  const [songs, setSongs] = useState([])
  const nav = useNavigate()

  function addSong() {
    const s = songInput.trim()
    if (!s) return
    setSongs(prev => [...prev, s])
    setSongInput('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || songs.length === 0) {
      alert('Please add mood name and at least one song')
      return
    }
    try {
      await API.post('/', { name: name.trim(), songs })
      nav('/')
    } catch (err) {
      console.error(err)
      alert('Failed to add')
    }
  }


return (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 p-6 flex justify-center">
    <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl border border-purple-100">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-4">
          <span className="text-3xl">➕</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Add New Mood
        </h2>
        <p className="text-gray-600">Create your perfect playlist</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Mood Name */}
        <div>
          <label className="block text-lg font-bold text-gray-800 mb-3 items_flex items-center gap-2">
            ✨ Mood Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none text-lg font-medium transition-all"
            placeholder="Ex: Happy, Sad, Chill..."
          />
        </div>

        {/* Add Song */}
        <div>
          <label className="block text-lg font-bold text-gray-800 mb-3 items_flex items-center gap-2">
            🎵 Add Song
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={songInput}
              onChange={e => setSongInput(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none text-lg font-medium transition-all"
              placeholder="Song name"
            />
            <button
              type="button"
              onClick={addSong}
              className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold"
            >
              Add
            </button>
          </div>
        </div>

        {/* Song List */}
        <div className="bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl p-6 min-h-[200px]">
          {songs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🎵</span>
              </div>
              <p className="text-gray-500 font-medium">No songs added yet.</p>
              <p className="text-sm text-gray-400 mt-1">Start building your playlist above</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Your Playlist ({songs.length} {songs.length === 1 ? 'song' : 'songs'})
                </h3>
              </div>
              {songs.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <span className="text-gray-800 font-medium flex items-center gap-2">
                    🎵 {s}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-5 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          ✨ Create Mood
        </button>
      </form>
    </div>
  </div>
);
}
