import React, { useState, useEffect } from 'react';
import { FaCodeBranch, FaStar } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import authService from '../appwrite/authService';
import service from '../appwrite/services';

const GistDetail = ({ gist }) => {
  const [user, setUser] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser(); 
        setUser(userData);

        if (userData) {
          const starredGists = JSON.parse(localStorage.getItem('starredGists') || '[]');
          setIsStarred(starredGists.some((starredGist) => starredGist.id === gist.id));
        }
      } catch (error) {
        console.error('Error fetching user or starred gists:', error);
      }
    };

    fetchUser();
  }, [gist.id]);

  const handleStarGist = async () => {
    if (!user) return; 

    try {
      if (isStarred) {
        await service.unstarGist(gist.id); 
    
        const starredGists = JSON.parse(localStorage.getItem('starredGists') || '[]');
        const updatedStarredGists = starredGists.filter(starredGist => starredGist.id !== gist.id);
        localStorage.setItem('starredGists', JSON.stringify(updatedStarredGists));
      } else {
        await service.starGist(gist.id); 
      
        const starredGists = JSON.parse(localStorage.getItem('starredGists') || '[]');
        starredGists.push(gist);
        localStorage.setItem('starredGists', JSON.stringify(starredGists));
      }
      setIsStarred(!isStarred);
    } catch (error) {
      console.error('Error starring/un-starring gist:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center space-x-4">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <img 
            src={gist.owner?.avatar_url} 
            alt={gist.owner?.login} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <div className="text-lg font-semibold">
              {gist.owner?.login || 'Unknown'}
            </div>
            <div className="text-gray-500">
              {gist.description || 'No Description'}
            </div>
          </div>
        </div>

        <div className="text-gray-600">
          <div className="text-sm mb-1">
            <span className="font-bold">Notebook: </span>
            {gist.owner?.login || 'Unknown'}
          </div>
          <div className="text-sm">
            <span className="font-bold">Updated: </span>
            {formatDistanceToNow(new Date(gist.updated_at), { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="flex space-x-6 items-center">
        <div className="flex items-center space-x-1">
          <FaCodeBranch className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          <span className="text-gray-500">{gist.forks_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaStar 
            className={`cursor-pointer ${isStarred ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-500`} 
            onClick={handleStarGist}
          />
          <span className="text-gray-500">{gist.stargazers_count}</span>
        </div>
      </div>
    </div>
  );
};

export default GistDetail;

