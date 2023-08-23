import React from 'react';
import { FaUser, FaCalendar, FaShoppingCart } from 'react-icons/fa';
import '../styles.css';
import DropdownMenu from './MenuDropdown';
import menuData from './menuData'; 
import { Link } from 'react-router-dom';

const Navbar = () => {


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            className="navbar-brand-img"
            src="/logo512.png"
            alt="Site-Logo"
            width="55"
            height="44"
          />
          <span className="logo-text ms-2 fw-bold" style={{ fontSize: '1.2rem' }}>
            <em>MoreVegans</em>
          </span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks" 
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarLinks"> 
          <ul className="ms-auto navbar-nav">
            <li className="nav-item">
              <Link to="https://fastfood-drf-dfd5756f86e9.herokuapp.com/" className="navbar-text nav-link">
                <FaCalendar className="me-1" />
                Booking-site
              </Link>
            </li>
            <li className="nav-item">
              <span className="navbar-text me-2 fw-bold">|</span>
            </li>

            <li className="nav-item dropdown">
              <DropdownMenu menuData={menuData} />
            </li>

            <li className="nav-item">
              <a href="#" className="navbar-text nav-link">
                <FaUser className="me-1" />
                Logged-in
              </a>
            </li>

            <li className="nav-item">
              <span className="me-2">&nbsp;</span>
            </li>

            <li className="nav-item">
              <Link to="/summary" className="navbar-text nav-link">
                <FaShoppingCart className="me-1" />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
