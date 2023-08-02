import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';

const DropdownMenu = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuEnter = () => {
    setIsOpen(true);
  };

  const handleMenuLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`navbar-menu-dropdown ${isOpen ? 'open' : ''}`}
      onMouseEnter={handleMenuEnter}
      onMouseLeave={handleMenuLeave}
    >
      <a
        href="#"
        className="navbar-text nav-link fw-bold"
        role="button"
        onClick={(e) => e.preventDefault()} // Prevent the link from navigating
      >
        <FaHome className="me-1" />
        Menu
      </a>
      <div className={`menu-items ${isOpen ? 'show' : ''}`}>
        {menuData.map((menuItem, index) => (
          <div key={index}>
            <a href={menuItem.href} className="menu-item" id='dropdownLinks'>
              {menuItem.dropdownTitle}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
