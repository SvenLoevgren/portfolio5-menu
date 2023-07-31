import React, { useState } from 'react';
import { FaHome, FaUser, FaCalendar, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [summary, setSummary] = useState(0); // Initialize the summary state with 0

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid" id="navbar-color">
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

        {/* Booking-site */}
        <div className="navbar-text me-2 fw-bold">
          <FaCalendar className="me-1" />
          Booking-site</div>

        {/* Separator */}
        <div className="navbar-text me-2 fw-bold">|</div>


        {/* Menu-Home */}
        <div className="navbar-text me-2">
          <FaHome className="me-1" />
          Menu-Home
        </div>

        {/* Login or Logout */}
        <div className="navbar-text me-2">
          <FaUser className="me-1" />
          Login
          {/*userIsLoggedIn ? 'Logout' : 'Login'*/}
        </div>

        {/* Space */}
        <div className="navbar-text me-2">&nbsp;</div>

        {/* Chart Icon and Sum */}
        <div className="navbar-text me-2">
          <FaShoppingCart className="me-1" />
          <span className="fw-bold">Sum=</span> {summary}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
