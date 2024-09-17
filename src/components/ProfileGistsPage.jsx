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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Gists</h1>
      <div className="space-y-4">
        {gists.length > 0 ? (
          gists.map((gist) => (
            <div key={gist.$id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{gist.description || 'No Description'}</h2>
              <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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


