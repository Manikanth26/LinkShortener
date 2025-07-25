import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShortLinkHandler from './components/ShortLinkHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortLink" element={<ShortLinkHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
