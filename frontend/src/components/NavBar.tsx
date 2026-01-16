import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        PlayBoth▶ 
        </Link>

        <div className="flex items-center gap-6">
          {username ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                  {username[0].toUpperCase()}
                </div>
                <span className="text-gray-200 hidden md:block">
                  {username}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
              >
               Logout 
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
             Login 
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
