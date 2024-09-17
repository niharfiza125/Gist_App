import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, restoreSession } from '../store/authSlice'; 
import authService from '../appwrite/authService';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   
    dispatch(restoreSession());
  }, [dispatch]);

  const handleLogout = async () => {
    await authService.logout(); 
    dispatch(logout());         
    navigate('/login');         
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">GistApp</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            {auth.status ? (
              <>
                <li>
                  <Link to="/landing" className="text-gray-300 hover:text-white transition">Home</Link>
                </li>
                <li>
                  <Link to="/gist" className="text-gray-300 hover:text-white transition">Gists</Link>
                </li>
                <li className="relative">
                  <button 
                    onClick={toggleDropdown} 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                  >
                    {auth.userData?.prefs?.avatar && (
                      <img
                        src={auth.userData.prefs.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-600"
                      />
                    )}
                    <span>{auth.userData?.name || 'User'}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 border border-gray-300 rounded-md shadow-lg">
                      <ul>
                        <li>
                          <Link 
                            to="/profile" 
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/profile/gists" 
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Gists
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={handleLogout} 
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

