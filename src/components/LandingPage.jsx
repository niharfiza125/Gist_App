import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import GistDetail from './GistDetail'; 

const LandingPage = () => {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchGists(currentPage);
  }, [currentPage]);

  const fetchGists = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/gists/public?page=${page}&per_page=${pageSize}`
      );
      setGists(response.data);
      setTotalItems(response.headers['x-total-count'] || response.data.length * 100);
    } catch (error) {
      setError('Error fetching gists');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Public Gists</h1>
          <p className="text-lg text-gray-600">Browse through the latest public gists on GitHub.</p>
        </div>
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"  // Link to GitHub logo
          alt="GitHub"
          className="w-16 h-16"  // Adjust the size of the logo
        />
      </header>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <section>
        {gists.length === 0 ? (
          <p className="text-center text-gray-500">No gists found.</p>
        ) : (
          <ul className="space-y-6">  {/* Increased spacing for a cleaner look */}
            {gists.map((gist) => (
              <li key={gist.id}>
                <GistDetail gist={gist} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LandingPage;

