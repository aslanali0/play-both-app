import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notifications from "./notifications/Notifications";

const Navbar = () => {
  const { user, profile, loading, handleLogout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const defaultAvatar = user?.username?.charAt(0).toUpperCase() || " ?";

  return (
    <nav className="sticky top-0 z-[50] bg-black/50 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link
            to="/home"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent shrink-0"
          >
            PlayBoth▶
          </Link>

          <div className="hidden  md:flex gap-8">
            <Link
              to="/feed"
              className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
            >
              Feed
            </Link>
            <Link
              to="/community"
              className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
            >
              Community
            </Link>
            <Link
              to="/friends"
              className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
            >
              Friends
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          {!loading ? (
            <>
              {profile?.username && (
                <div className="flex items-center gap-3 md:gap-4">
                  <Notifications />

                  <Link to="/profile/me" className="flex items-center gap-2">
                    {profile?.avatar_url ? (
                      <img
                        src={profile?.avatar_url}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-orange-500 shadow-md"
                        alt="Profile"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-lg md:text-xl rounded-full bg-orange-500 font-black text-white">
                        {defaultAvatar}
                      </span>
                    )}
                    <span className="text-gray-200 hidden md:block font-medium">
                      {profile?.username}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hidden md:block text-sm font-medium text-gray-200 cursor-pointer bg-orange-700/50 rounded-full px-5 py-2 hover:bg-orange-700 hover:text-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}

              <button
                className="md:hidden text-orange-500 p-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </>
          ) : (
            <span className="text-gray-300">Loading...</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="animate-slide-down w-full md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
          <Link
            to="/feed"
            onClick={() => setIsOpen(false)}
            className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
          >
            Feed
          </Link>
          <Link
            to="/community"
            onClick={() => setIsOpen(false)}
            className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
          >
            Community
          </Link>
          <Link
            to="/friends"
            onClick={() => setIsOpen(false)}
            className="transition-colors text-orange-600 hover:text-orange-400 font-medium"
          >
            Friends
          </Link>

          {profile?.username && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left mt-2 text-sm font-medium text-red-500 hover:text-red-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
