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
    <header className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-100">
          Gist<span className="text-gray-400">App</span>
        </h1>
        <nav>
          <ul className="flex items-center space-x-6">
            {auth.status ? (
              <>
                <li>
                  <Link 
                    to="/landing" 
                    className="text-gray-300 font-semibold hover:text-gray-400 transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gist" 
                    className="text-gray-300 font-semibold hover:text-gray-400 transition duration-300 ease-in-out"
                  >
                    Gists
                  </Link>
                </li>
                <li className="relative">
                  <button 
                    onClick={toggleDropdown} 
                    className="flex items-center space-x-3 text-gray-300 font-semibold hover:text-gray-400 transition duration-300 ease-in-out"
                  >
                    {auth.userData?.prefs?.avatar && (
                      <img
                        src={auth.userData.prefs.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-md"
                      />
                    )}
                    <span>{auth.userData?.name || 'User'}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg shadow-lg z-10">
                      <ul>
                        <li>
                          <Link 
                            to="/profile" 
                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/profile/gists" 
                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300"
                          >
                            My Gists
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={handleLogout} 
                            className="block w-full px-4 py-2 text-left hover:bg-gray-600 transition duration-300"
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
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out shadow-md"
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

