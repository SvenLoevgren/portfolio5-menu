import React, { useState } from 'react';
import { FaUser, FaCalendar, FaShoppingCart } from 'react-icons/fa';
import '../styles.css';
import DropdownMenu from './MenuDropdown';
import menuData from './menuData'; 
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Navbar = () => {
  const { authenticated, login, logout } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleMenuClick = () => {
    if (!authenticated) {
      setShowSignInModal(true);
    } else {
      setShowMenuModal(true);
    }
  };

  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
  };

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
            {authenticated ? (
              <Link to="#" className="navbar-text nav-link" onClick={handleLogoutClick}>
                <FaUser className="me-1" />
                Log Out
              </Link>
            ) : (
              <Link to="#" className="navbar-text nav-link" onClick={handleSignInClick}>
                <FaUser className="me-1" />
                Sign In
              </Link>
            )}
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
              {/* Sign In Modal */}
      <Modal show={showSignInModal} onHide={handleCloseSignInModal}>
        {/* ... (modal content for sign in) ... */}
      </Modal>

      {/* Log Out Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        {/* ... (modal content for log out) ... */}
      </Modal>

      {/* Menu Modal */}
      <Modal show={showMenuModal} onHide={handleCloseMenuModal}>
        {/* ... (modal content for menu access) ... */}
      </Modal>
    </nav>
  );
};

export default Navbar;