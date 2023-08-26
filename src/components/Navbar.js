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
    const {authenticated, login, logout } = useAuth();
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);

    const handleSignIn = async () => {
        try {
            await login(username, password);

            if(!authenticated()) {
            setShowSignInModal(false);
            } else {
               setShowServerErrorModal(true);    
            }           
        } catch (error) {
            setShowServerErrorModal(true);
        }
    };

    const handleCloseSignInModal = () => {
        setShowSignInModal(false);
    };

    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const handleLogoutConfirmNavigation = () => {
        logout();
    };

    const handleLogoutCloseModal = () => {
        setShowLogoutConfirmModal(false);
    };

    const handleMenuClick = () => {
        if (!authenticated) {
            setShowSignInModal(true);
        } else {
            setShowMenuModal(true);
        }
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
        <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <p>Enter your credentials below to sign in.</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
                <Button id="MenuSummary-register" variant="primary" href="https://fastfood-drf-dfd5756f86e9.herokuapp.com/accounts/signup">
                    Create New Account
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showLogoutConfirmModal} onHide={handleLogoutCloseModal}>
            <Modal.Header closeButton className='d-flex justify-content-center'>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                Are you sure that you want to log out?
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={handleLogoutConfirmNavigation}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        {/* Menu Modal */}
        <Modal show={showMenuModal} onHide={() => setShowSignInModal(false)}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Please Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <p>You need to be logged in to see your Menu.</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
                <Button id="MenuSummary-register" variant="primary" href="https://fastfood-drf-dfd5756f86e9.herokuapp.com/accounts/signup">
                    Create New Account
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showServerErrorModal} onHide={() => setShowServerErrorModal(false)}>
            <Modal.Header closeButton className='d-flex justify-content-center'>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                Ops! something went wrong! Please try again or contact support at +46-123456789 for assistance.
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={() => setShowServerErrorModal(false)}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    </nav>
    );
};

export default Navbar;