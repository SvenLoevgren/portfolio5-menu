import React, { useState } from 'react';
import { FaUser, FaCalendar, FaShoppingCart } from 'react-icons/fa';
import '../styles.css';
import DropdownMenu from './MenuDropdown';
import menuData from './menuData'; 
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
    const {authenticated, login, logout, isAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showLoggedInModal, setShowLoggedInModal] = useState(false);
    const [showServerErrorModal, setShowServerErrorModal] = useState(false);

    const handleSignInClick = () => {
        setShowSignInModal(true);
    };

    const handleSignIn = async () => {
        try {
            await login(username, password);

            if(isAuthenticated()) {
            setShowSignInModal(false);
            setShowMenuModal(false);
            setShowLoggedInModal(true);
            } else {
                setShowSignInModal(false);
                setShowMenuModal(false);
                setShowServerErrorModal(true);    
            }           
        } catch (error) {
            setShowSignInModal(false);
            setShowMenuModal(false);
            setShowServerErrorModal(true);
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
    };

    const handleLogoutCloseModal = () => {
        setShowLogoutModal(false);
    };

    const handleMenuClick = () => {
        setShowMenuModal(true);
    };

    const handleLoggedInConfirm = () => {
        setShowLoggedInModal(false);
    };

    const handleErrorModal = () => {
        setShowServerErrorModal(false)
        setShowMenuModal(false);
        setShowSignInModal(true);
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
                    {/* Menu link authentication */}
                    {authenticated ? (
                    <li className="nav-item dropdown">
                        <DropdownMenu menuData={menuData} />
                    </li>
                        ) : (
                    <Link to="#" className="navbar-text nav-link fw-bold" onClick={handleMenuClick}>
                        <FaHome className="me-1" />
                        Menu
                    </Link>
                    )}
                    {/* User SignIN/Out authentication */}
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
            <Modal.Header closeButton>
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
        <Modal show={showLogoutModal} onHide={handleLogoutCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                Are you sure that you want to log out?
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={handleLogoutConfirm}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        {/* Menu Modal */}
        <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)}>
            <Modal.Header closeButton>
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
        <Modal show={showLoggedInModal} onHide={() => setShowLoggedInModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Logged in Success</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                Logged in as {username}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={handleLoggedInConfirm}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showServerErrorModal} onHide={() => setShowServerErrorModal(false)}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                Ops! something went wrong! Please try again or contact support at +46-123456789 for assistance.
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={handleErrorModal}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    </nav>
    );
};

export default Navbar;