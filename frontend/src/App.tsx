import { useState } from 'react'
import { getGame } from './api/api'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/HomePage'
function App() {
  return (
    <div className="m-0 w-screen h-screen flex flex-col justify-center bg-slate-950 ">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App
