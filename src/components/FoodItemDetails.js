import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/foodItemDetails.css';
import menuData from './menuData';
import MenuItemNotFound from './MenuItemNotFound';

const FoodItemDetails = () => {
  const navigate = useNavigate();
  const { foodName } = useParams();
  const menuItem = menuData.find((menu) => menu.dropdownDetails.some((item) => item.name === foodName));

  if (!menuItem) {
    return <MenuItemNotFound />;
  }

  const item = menuItem.dropdownDetails.find((item) => item.name === foodName);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="FoodItemDetails-container">
      
      <div className="FoodItemDetails-header">
        <img src={item.imageUrl} alt={item.name} />
        <h2>{item.name}</h2>
      </div>
      <div className="FoodItemDetails-description">
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
      </div>
      {/* Wrapper div for centering */}
      <div className="FoodItemDetails-button-wrapper">
        <div className="Food-close-button">
          <button onClick={handleClose}>Close Window</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemDetails;
