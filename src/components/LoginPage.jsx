import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/authService';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

const LoginPage = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleGitHubLogin = async () => {
    dispatch(loginStart());
    setError('');

    try {
      await authService.loginWithGitHub();
      const userSession = await authService.getCurrentUser();
      if (userSession) {
        dispatch(loginSuccess({ userData: userSession }));
        navigate('/profile');
      }
    } catch (err) {
      dispatch(loginFailure({ error: err.message }));
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
      
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
            alt="GitHub"
            className="w-16 h-16 mb-4"  
          />
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Login with GitHub</h1>
          <p className="text-gray-600 mb-6 text-center">Access your gists and manage your profile</p>
        </div>
        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center bg-gray-800 text-white py-3 px-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
          ) : (
            <>
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                alt="GitHub"
                className="w-6 h-6 mr-2" 
              />
              <span className="text-lg font-medium">Login with GitHub</span>
            </>
          )}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;





