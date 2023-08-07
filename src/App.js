// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import MenuItemTemplate from './components/MenuItemTemplate';
import MenuItemNotFound from './components/MenuItemNotFound'; 
import Navbar from './components/Navbar';
import menuData from './components/menuData'; 
import FoodItemDetails from './components/FoodItemDetails';
import MenuItemSummaryTemplate from './components/MenuItemSummaryTemplate'; 

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
        <Route path="/details/:foodName" element={<FoodItemDetails />} />
        <Route path="/summary" element={<MenuItemSummaryTemplate />} />
        <Route path="*" element={<MenuItemNotFound />} /> {/* This will match any other path */}
      </Routes>
    </Router>
  );
};

export default App;
