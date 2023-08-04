import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import MenuItemTemplate from './components/MenuItemTemplate';
import Navbar from './components/Navbar';
import menuData from './components/menuData'; // Importing the menuData file

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
        <Route path="/menu/:title" element={<MenuItemTemplate menuData={menuData} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
