import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddMood from './pages/AddMood'
import EditMood from './pages/EditMood'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Recommend from './pages/Recommend'

export default function App(){
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: 20 }}>
        {/* <Link to="/" style={{ marginRight: 10 }}></Link>
        <Link to="/add"></Link> */}
      </nav>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMood />} />
        <Route path="/edit/:id" element={<EditMood />} />
        {/* <Route path="/recommend/:moodName" element={<Recommend />} /> */}
      </Routes>
    </div>
  )
}
