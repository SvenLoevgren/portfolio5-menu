import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';

const MenuDropdown = ({ menuData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`navbar-menu-dropdown${isDropdownOpen ? ' open' : ''}`}>
      <a
        href="#"
        className="navbar-text nav-link fw-bold dropdown-toggle"
        role="button"
        onClick={toggleDropdown}
      >
        <FaHome className="me-1" />
        Menu
      </a>
      <ul className={`menu-items${isDropdownOpen ? ' show' : ''}`}>
        {menuData.map((menuItem, index) => (
          <li key={index}>{menuItem.dropdownTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDropdown;
