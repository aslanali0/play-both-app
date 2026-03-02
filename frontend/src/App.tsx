import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FriendsPage from "./pages/FriendsPage";
import HomePage from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/NavBar.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import PublicProfilePage from "./pages/PublicProfilePage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import FeedPage from "./pages/FeedPage.tsx";
function App() {
  const location = useLocation();
  return (
    <div className="text-white m-0 w-screen  min-h-screen flex flex-col bg-slate-950 ">
      <AuthProvider>
        <Navbar />

        <div key={location.pathname} className="animate-slide-up">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <FeedPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PublicProfilePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/profile/me"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <FriendsPage />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
