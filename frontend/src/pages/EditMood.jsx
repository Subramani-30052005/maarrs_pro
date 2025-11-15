import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditMood(){
  const { id } = useParams()
  const [name, setName] = useState('')
  const [songs, setSongs] = useState([])
  const [songInput, setSongInput] = useState('')
  const nav = useNavigate()

  useEffect(()=>{
    async function load(){
      try {
        const res = await API.get(`/${id}`)
        setName(res.data.name)
        setSongs(res.data.songs)
      } catch (err) { console.error(err) }
    }
    load()
  }, [id])

  function addSong(){
    const s = songInput.trim()
    if (!s) return
    setSongs(prev=> [...prev, s])
    setSongInput('')
  }
  function removeSong(idx){
    setSongs(prev=> prev.filter((_,i)=> i!==idx))
  }

  async function handleSave(e){
    e.preventDefault()
    try {
      await API.put(`/${id}`, { name, songs })
      nav('/')
    } catch (err) { console.error(err) }
  }

  return (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 p-6 flex justify-center">
    <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl border border-purple-100">
      
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-4">
          <span className="text-3xl">✏️</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Edit Mood
        </h2>
        <p className="text-gray-600">Update your playlist</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-8">

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
          />
        </div>

        {/* Add Song Section */}
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
              placeholder="Enter song name"
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
              <p className="text-sm text-gray-400 mt-1">Add some songs to your playlist</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Current Playlist ({songs.length} {songs.length === 1 ? 'song' : 'songs'})
                </h3>
              </div>
              {songs.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <span className="text-gray-800 font-medium">
                      🎵 {s}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSong(i)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-all"
                  >
                    remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-5 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-2xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  </div>
);
}
