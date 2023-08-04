import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import '../styles.css';

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
      <Link to="/" className="navbar-text nav-link fw-bold"> {/* Use the Link component instead of <a> */}
        <FaHome className="me-1" />
        Menu
      </Link>
      <div className={`menu-items ${isOpen ? 'show' : ''}`}>
        {menuData.map((menuItem, index) => (
          <div key={index}>
            {/* Use the Link component with the correct URL */}
            <Link to={`/menu/${encodeURIComponent(menuItem.dropdownTitle)}`} className="menu-item" id='dropdownLinks'>
              {menuItem.dropdownTitle}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
