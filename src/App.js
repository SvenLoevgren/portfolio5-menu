import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import MenuItemTemplate from './components/MenuItemTemplate';
import MenuItemNotFound from './components/MenuItemNotFound';
import Navbar from './components/Navbar';
import menuData from './components/menuData';
import FoodItemDetails from './components/FoodItemDetails';
import MenuItemSummaryTemplate from './components/MenuItemSummaryTemplate';
import MenuItemTemplateApiEndpoint from './components/MenuItemTemplateApiEndpoint';

const LayoutWithNavbar = ({ children, summary }) => {
  return (
    <div>
      <Navbar summary={summary} />
      {children}
    </div>
  );
};

const App = () => {
  const [summary, setSummary] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state here

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LayoutWithNavbar summary={summary}><Welcome /></LayoutWithNavbar>}
        />
        <Route
          path="/menu/:title"
          element={<MenuItemTemplate menuData={menuData} updateSummary={setSummary} setCartItems={setCartItems} />}
        />
        <Route path="/details/:foodName" element={<FoodItemDetails />} />
        <Route path="/summary" element={<MenuItemSummaryTemplate />} />
        <Route path="/endpoint" element={<MenuItemTemplateApiEndpoint cartItems={cartItems} />} />
        <Route path="*" element={<MenuItemNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
