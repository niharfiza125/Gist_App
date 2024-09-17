import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../appwrite/services'; 
import { useSelector, useDispatch } from 'react-redux';
import { loginStart } from '../store/authSlice';
const GistPage = () => {
  const { id } = useParams(); 
  const [gist, setGist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [isForked, setIsForked] = useState(false);
  const auth = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGist = async () => {
      setLoading(true);
      try {
        const response = await service.getGist(id);
        setGist(response);
        setIsStarred(false);
        setIsForked(false);
      } catch (error) {
        setError('Failed to fetch gist');
      } finally {
        setLoading(false);
      }
    };

    fetchGist();
  }, [id]);

  const handleStar = async () => {
    if (!auth.status) {
      alert('You must be logged in to star a gist');
      return;
    }

    try {
      await service.starGist(id);
      setIsStarred(true); 
    } catch (error) {
      alert('Failed to star the gist');
    }
  };

  const handleFork = async () => {
    if (!auth.status) {
      alert('You must be logged in to fork a gist');
      return;
    }

    try {
      await service.forkGist(id);
      setIsForked(true); 
    } catch (error) {
      alert('Failed to fork the gist');
    }
  };

  return (
    <div>
      <header>
        <h1>Gist Details</h1>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {gist && (
        <div>
          <h2>{gist.description}</h2>
          <div>
            <button onClick={handleStar}>
              {isStarred ? '⭐ Starred' : 'Star'}
            </button>
            <button onClick={handleFork}>
              {isForked ? '🔁 Forked' : 'Fork'}
            </button>
          </div>
          <div>
            {gist.files.map((file) => (
              <div key={file.filename}>
                <h3>{file.filename}</h3>
                <pre>{file.content}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GistPage;
