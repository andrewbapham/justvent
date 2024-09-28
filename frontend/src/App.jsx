import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import NavBar from '../src/components/NavBar'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <GuestRoute path="/register" element={<Auth key="register" />} /> */}
          {/* <GuestRoute path="/login" element={<Auth key="login" />} /> */}
          {/* <AuthRoute path="/settings" element={<Settings />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          {/* <Route path="/profile/:username" element={<Profile />} /> */}
          {/* <AuthRoute path="/@:username" element={<Profile />} /> */}
        </Routes>
      </main>
      <footer>
        <div className="container">
          footer
        </div>
      </footer>
    </Router>
  )
}

export default App
