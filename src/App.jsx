import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import GistPage from './components/GistPage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ProfileGistsPage from './components/ProfileGistsPage';
import ProfileStarredGistsPage from './components/ProfileStarredGistsPage';
import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* <Route path="/gist/:id" element={<ProfilePage />} /> */}
          <Route path="/profile/gists" element={<ProfileGistsPage />} />
          <Route path="/profile/starred" element={<ProfileStarredGistsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

