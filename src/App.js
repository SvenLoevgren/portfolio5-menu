import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';

const LayoutWithNavbar = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar><Welcome /></LayoutWithNavbar>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
