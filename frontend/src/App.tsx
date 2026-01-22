import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/NavBar.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
function App() {
  return (
    <div className="text-white m-0 w-screen min-h-screen flex flex-col bg-slate-950 ">
      <AuthProvider>
        <BrowserRouter>

          <Navbar />
          <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>)
}

export default App
