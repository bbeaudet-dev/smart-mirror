import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import MirrorInterface from './components/MirrorInterface';
import PhoneInterface from './components/PhoneInterface';

// Custom Hook
import { useSmartMirrorData } from './hooks/useSmartMirrorData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MirrorInterface />} />
        <Route path="/phone" element={<PhoneInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
