import React from 'react';
import { useParams } from 'react-router-dom';
import '../menuItemTemplate.css';
import menuData from './menuData'; // Importing the menuData file
import MenuItemDetails from './MenuItemDetails'; // Importing the new component

const MenuItemTemplate = () => {
  const { title } = useParams(); // Get the title from the URL parameter

  // Find the menu item with the corresponding title in the menuData
  const menuItem = menuData.find((item) => item.dropdownTitle === title);

  if (!menuItem) {
    // If the title is not found in menuData, you can display a fallback or redirect to an error page
    return <div>Menu item not found.</div>;
  }

  const totalItems = menuItem.dropdownDetails.length;

  return (
    <div className="Template-menu-item-template-container">
      {/* Logo */}
      <div className="Template-logo"></div>

      {/* Menu items */}
      <div className="container-fluid">
        <div className="row">
          {menuItem.dropdownDetails.map((item, index) => (
            <div key={index} className="col-md-3">
              <MenuItemDetails item={item} price="$2.50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemTemplate;
