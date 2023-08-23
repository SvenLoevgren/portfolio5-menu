import React, { useState } from 'react';
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
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state here

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LayoutWithNavbar> <Welcome /></LayoutWithNavbar>}
        />
        <Route
          path="/menu/:title"
          element={<MenuItemTemplate menuData={menuData} setCartItems={setCartItems} />}
        />
        <Route path="/details/:foodName" element={<FoodItemDetails />} />
        <Route path="/summary" element={<MenuItemSummaryTemplate/>} />
        <Route path="*" element={<MenuItemNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
