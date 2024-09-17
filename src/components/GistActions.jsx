import React from 'react';
import { FaCodeBranch, FaStar } from 'react-icons/fa'; 

const GistActions = ({ forks, stars }) => (
  <div className="flex items-center space-x-4 mt-2">
    <div className="flex items-center space-x-1">
      <FaCodeBranch className="text-gray-600 hover:text-gray-800 cursor-pointer" /> 
      <span className="text-gray-600">{forks}</span>
    </div>
    <div className="flex items-center space-x-1">
      <FaStar className="text-yellow-400 hover:text-yellow-500 cursor-pointer" />
      <span className="text-gray-600">{stars}</span>
    </div>
  </div>
);

export default GistActions;
