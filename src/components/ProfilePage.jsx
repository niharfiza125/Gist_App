import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/authService';
import service from '../appwrite/services';

const ProfilePage = () => {
  const [files, setFiles] = useState([{ name: '', content: '' }]);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleAddFile = () => {
    setFiles([...files, { name: '', content: '' }]);
  };

  const handleFileChange = (index, event) => {
    const updatedFiles = [...files];
    updatedFiles[index][event.target.name] = event.target.value;
    setFiles(updatedFiles);
  };

  const handleCreateGist = async () => {
    try {
      if (!user) {
        alert('Please log in to create a gist.');
        return;
      }

      await service.createGist({
        description,
        files,
        isPublic,
        userId: user.$id,
      });

      alert('Gist created successfully!');
      navigate('/profile/gists');
    } catch (error) {
      console.error('Error creating gist:', error);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <div className="w-72 bg-white p-6 shadow-lg rounded-r-lg">
        <div className="flex items-center mb-8">
     
          <div className="relative">
            <img
              src={user?.avatar || 'https://avatars.githubusercontent.com/u/9919?v=4'}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-gray-800">{user?.name || 'User Name'}</h2>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left bg-gray-800 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition"
              onClick={() => navigate('/profile/gists')}
            >
              User Profile & Gists
            </button>
          </li>
          <li>
            <button
              className="w-full text-left bg-gray-800 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition"
              onClick={() => navigate('/profile/starred')}
            >
              Starred Gists
            </button>
          </li>
          <li>
            <button
              className="w-full text-left bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

     
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Create a New Gist</h1>
        <div className="bg-white p-8 shadow-lg rounded-lg">
   
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Gist Description</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter gist description"
            />
          </div>

        
          {files.map((file, index) => (
            <div key={index} className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">File Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`File #${index + 1}.txt`}
                    value={file.name}
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">File Content</label>
                  <textarea
                    name="content"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter file content"
                    rows="4"
                    value={file.content}
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mb-6">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={handleAddFile}
            >
              Add File
            </button>
            <button
              className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition"
              onClick={handleCreateGist}
            >
              Create Gist
            </button>
          </div>

      
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Gist Visibility</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value === 'true')}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


