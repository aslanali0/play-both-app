import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, handleLogout } = useAuth()
  const defaultAvatar = user?.username?.charAt(0).toUpperCase() || " ?";
  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          PlayBoth▶
        </Link>

        <div className="flex flex items-center gap-6">
          {!loading ? (<div>
            {user?.username ? (
              <div className="flex gap-4">
                <Link to="/profile" className="flex items-center gap-2">
                  {user?.profile?.avatar_url ? (
                    <img
                      src={user?.profile?.avatar_url}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                      alt="Profile"
                    />) : (<span className="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-indigo-500 font-black ">
                      {defaultAvatar}
                    </span>)
                  }
                  <span className="text-gray-200 hidden md:block">
                    {user?.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-200 cursor-pointer bg-indigo-700/50 rounded-full p-3 hover:bg-indigo-700 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (null)
            /* Will be implemented for guest users */}
            {/* <Link */}
            {/*   to="/login" */}
            {/*   className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all" */}
            {/* > */}
            {/*   Login */}
            {/* </Link> */
            }</div>) : <span>Loading...</span>}
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
