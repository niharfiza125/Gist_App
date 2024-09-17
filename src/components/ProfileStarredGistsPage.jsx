import React, { useEffect, useState } from 'react';
import authService from '../appwrite/authService';
import service from '../appwrite/services';

const ProfileStarredGistsPage = () => {
  const [user, setUser] = useState(null);
  const [starredGists, setStarredGists] = useState([]);

  useEffect(() => {
    const fetchUserAndStarredGists = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);

        if (userData) {
        
          const response = await service.getStarredGists();
          if (response && response.documents) {
            setStarredGists(response.documents);
          }
        }
      } catch (error) {
        console.error('Error fetching starred gists:', error);
      }
    };

    fetchUserAndStarredGists();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Starred Gists</h1>
      <div className="space-y-4">
        {starredGists.length > 0 ? (
          starredGists.map((gist) => (
            <div key={gist.$id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{gist.description || 'No Description'}</h2>
              <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View Gist
              </a>
            </div>
          ))
        ) : (
          <p>No starred gists found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileStarredGistsPage;




