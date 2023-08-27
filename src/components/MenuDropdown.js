import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles.css';

const DropdownMenu = ({ menuData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuEnter = () => {
        setIsOpen(true);
    };

    const handleMenuLeave = () => {
        setIsOpen(false);
    };

  // Create a map to group items by title
    const groupedItems = menuData.reduce((acc, group) => {
        group.dropdownDetails.forEach((item) => {
            if (!acc[item.title]) {
                acc[item.title] = [];
            }
            acc[item.title].push(item);
        });
        return acc;
    }, {});

    return (
        <div
        className={`navbar-menu-dropdown ${isOpen ? 'open' : ''}`}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        >
            <Link to="/" className="navbar-text nav-link fw-bold">
              <FaHome className="me-1" />
              Menu
            </Link>
            <div className={`menu-items ${isOpen ? 'show' : ''}`}>
                {Object.entries(groupedItems).map(([title, items]) => (
                    <div key={title}>
                        <Link
                        to={`/menu/${encodeURIComponent(title)}`} // Use title as part of the link
                        className="menu-item"
                        id="dropdownLinks"
                        >
                        {title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropdownMenu;
