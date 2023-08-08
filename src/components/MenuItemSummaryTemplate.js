import React from 'react';
import '../styles/MenuItemSummaryTemplate.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuItemSummaryTemplate = () => {
  const token = process.env.REACT_APP_AUTH_TOKEN;
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/menu/cart', {
          headers: {
            Authorization: {token}, // Replace with your actual token
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [token]);
  console.log('Rendering MenuItemSummaryTemplate');
  const navigate = useNavigate();
  return (
    <div className="MenuItemSummary-container container-fluid">
      <div className="MenuItemSummary-header text-center container-fluid">
        <h1>Menu Summary!</h1><hr />
      </div>
      <div className="MenuItemSummary-instructions text-center container-fluid">
        <p>Welcome to the menu summary, where you can view your items and delete unwanted items from the menu!<br />
        To delete items from your Cart, just select any items in the list and press the <strong><em>"Delete"</em></strong> button at the bottom of this page...<br />
        If you are saticfied with your menu, then note down your summay and had back to to the menu page by clicking on the <strong><em>"Back To Menu"</em></strong> button.<br />
        When we have added an online payment method, you will be able to "Checkout" your items and reserve your dinner in advanced together with your booking.<br />
        <strong>Enjoy you meal!</strong>
        </p>
      </div>
      <div className="MenuItemSummary-items">
        {/* Display selected items */}
        <ul>
          {console.log('cartItems:', cartItems)}
          {cartItems.map((itemName, index) => (
            <li key={index}>{itemName}</li>
          ))}
        </ul>
      </div>
      <div className='MenuSummary-button-wrapper'>
        <button className="MenuSummary-button" id="MenuSummary-Home" onClick={() => navigate('/')}>
          Back To Menu
        </button>
        <button className="MenuSummary-button" id="MenuSummary-Delete">
          Delete Items
        </button>
      </div>
    </div>
  );
};

export default MenuItemSummaryTemplate;
