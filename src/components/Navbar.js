import React, { useState } from 'react';
import { FaHome, FaUser, FaCalendar, FaShoppingCart } from 'react-icons/fa';
import '../styles.css';

const Navbar = () => {
  const [summary, setSummary] = useState(0); // Initialize the summary state with 0

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        {/* Logo and MoreVegans */}
        <div className="navbar-brand">
          <img
            className="navbar-brand-img"
            src="/logo512.png" // Replace with the URL of your logo image
            alt="Site-Logo"
            width="55"
            height="44"
          />
          <span className="logo-text ms-2 fw-bold" style={{ fontSize: '1.2rem' }}>
            <em>MoreVegans</em>
          </span>
        </div>

        {/* Navbar Toggler */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end">        
            <ul className="navbar-nav">
              {/* Booking-site */}
              <li className="nav-item">
                <a href="#" className="navbar-text nav-link">
                  <FaCalendar className="me-1" />
                  Booking-site
                </a>
              </li>

              {/* Separator */}
              <li className="nav-item">
                <span className="navbar-text me-2 fw-bold">|</span>
              </li>

              {/* Menu-Home */}
              <li className="nav-item">
                <a href="#" className="navbar-text nav-link fw-bold">
                  <FaHome className="me-1" />
                  Menu
                </a>
              </li>

              {/* Login or Logout */}
              <li className="nav-item">
                <a href="#" className="navbar-text nav-link">
                  <FaUser className="me-1" />
                  Logged-in
                  {/*userIsLoggedIn ? 'Logout' : 'Logged-in'*/}
                </a>
              </li>

              {/* Space */}
              <li className="nav-item">
                <span className="me-2">&nbsp;</span>
              </li>

              {/* Chart Icon and Sum */}
              <li className="nav-item">
                <a href="#" className="navbar-text nav-link">
                  <FaShoppingCart className="me-1" />
                  <span>Sum=</span> {summary}
                </a>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
