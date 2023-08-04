import React from 'react';
import { useParams } from 'react-router-dom';
import '../menuItemTemplate.css'; // IF I REMOVE THIS LINE THAN MY LAYOUT IS OK
import menuData from './menuData'; // Importing the menuData file

const MenuItemTemplate = () => {
  const { title } = useParams(); // Get the title from the URL parameter

  // Find the menu item with the corresponding title in the menuData
  const menuItem = menuData.find((item) => item.dropdownTitle === title);

  if (!menuItem) {
    // If the title is not found in menuData, you can display a fallback or redirect to an error page
    return <div>Menu item not found.</div>;
  }

  return (
    <div className="Template-menu-item-template-container">
      {/* Logo */}
      <div className="Template-logo"></div>

      {/* Menu items */}
      {menuItem.dropdownDetails.map((item, index) => (
        <div className="Template-menu-item" key={index}>
          <div>{item}</div>
          <div className="Template-price">$2.50</div> {/* You can update the price if needed */}
          <input type="checkbox" />
          <a className="Template-details-link" href={`/details/${item.replace(' ', '').toLowerCase()}`}>
            Details
          </a>
        </div>
      ))}

      {/* Buttons */}
      <div className="Template-buttons-container">
        <button className="Template-cancel-button">Cancel</button>
        <button className="Template-add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuItemTemplate;
