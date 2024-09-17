import React, { useEffect, useState } from 'react';
import authService from '../appwrite/authService';
import service from '../appwrite/services';

const ProfileGistsPage = () => {
  const [user, setUser] = useState(null);
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const fetchUserAndGists = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);

        if (userData) {
          const createdGists = await service.getUserGists(userData.$id);
          setGists(createdGists.documents || []);
        }
      } catch (error) {
        console.error('Error fetching user data or gists:', error);
      }
    };

    fetchUserAndGists();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Gists</h1>
      <div className="space-y-6">
        {gists.length > 0 ? (
          gists.map((gist) => (
            <div key={gist.$id} className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
              <img
                src={gist.owner?.avatar_url || 'https://via.placeholder.com/80'} 
                alt={gist.owner?.login || 'User Avatar'}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">
                  {gist.description || 'Untitled Gist'}
                </h2>
                <p className="text-gray-500">
                  Created by {gist.owner?.login || 'Unknown User'}
                </p>
              </div>
              <a
                href={gist.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Gist
              </a>
            </div>
          ))
        ) : (
          <p>No gists found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileGistsPage;

