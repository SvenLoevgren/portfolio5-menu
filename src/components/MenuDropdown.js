import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import SidebarItems from './SidebarItems';

const DropdownMenu = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState('');

  const handleMenuEnter = () => {
    setIsOpen(true);
  };

  const handleMenuLeave = () => {
    setIsOpen(false);
    setActiveTitle('');
  };

  const handleTitleEnter = (title) => {
    setIsOpen(true);
    setActiveTitle(title);
  };

  const handleTitleLeave = () => {
    setActiveTitle('');
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
          <div
            key={index}
            className={`menu-item ${isOpen && activeTitle === menuItem.dropdownTitle ? 'active' : ''}`}
            onMouseEnter={() => handleTitleEnter(menuItem.dropdownTitle)}
            onMouseLeave={handleTitleLeave}
          >
            <div>{menuItem.dropdownTitle}</div>

            {/* Sidebar */}
            {isOpen && activeTitle === menuItem.dropdownTitle && (
              <div className="sidebar">
                <ul>
                  {menuItem.sidebarItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
