import React from 'react';

const DropdownMenu = ({ menuData }) => {
  return (
    <div className="dropdown-menu">
      {menuData.map((menuItem, index) => (
        <div key={index}>
          <div>{menuItem.dropdownTitle}</div>
          <ul>
            {menuItem.sidebarItems.map((sidebarItem, subIndex) => (
              <li key={subIndex}>{sidebarItem}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;



