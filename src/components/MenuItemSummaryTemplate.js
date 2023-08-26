import React from 'react';
import '../styles/MenuItemSummaryTemplate.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/';

const MenuItemSummaryTemplate = () => {
    const [cartItems, setCartItems] = useState([]);
    const {authenticated, login, logout} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [selectedItemsForUpdate, setSelectedItemsForUpdate] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); 
    const [modalConfirmAction, setModalConfirmAction] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [showUpdateModalNoItems, setShowUpdateModalNoItems] = useState(false);
    const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showServerErrorModal, setShowServerErrorModal] = useState(false);


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (!authenticated) {
                    setShowSignInModal(true); // Show sign-in modal if not authenticated
                    return;
                }

                const response = await axios.get(`${BASE_URL}menu/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setCartItems(response.data);
            } catch (error) {
                // Handle error
                if (error.response && error.response.status === 500) {
                    // Show server error modal
                    setShowServerErrorModal(true);
                }
            }
        };

        fetchCartItems();
    }, [authenticated]);
      // ... (rest of the component)

    const handleSignIn = () => {
        login(username, password);
        setShowSignInModal(false);
    };

    const navigate = useNavigate();

    const handleLogoutAndNavigate = () => {
        setShowLogoutConfirmModal(true);
    };
    
    const handleLogoutConfirmNavigation = () => {
        logout();
        navigate('/');
    };
    
    const handleLogoutCloseModal = () => {
        setShowLogoutConfirmModal(false);
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
          let total = 0;
          for (const item of cartItems) {
            total += item.price * item.quantity;
          }
          return total;
        };
    
        const total = calculateTotalPrice();
        setTotalPrice(total);
    }, [cartItems]);
      

    const handleCloseAndNavigate = () => {
        setShowOrderModal(false);
        navigate('/');
    };

    const handleConfirm = () => {
        setShowOrderModal(true);
    };

    const handleCloseOrderModal = () => {
        setShowOrderModal(false);
    };

    const handleDeleteItems = () => {
        // Check if any item is selected for deletion
        const selectedItems = cartItems.filter(item => item.selected);
    
        if (selectedItems.length === 0) {
            // Show modal for no selected items
            setShowDeleteModal(true);
            setModalMessage("You need to select items from the list before you can use this function");
            setModalConfirmAction(null);
        } else {
            // Show modal for confirmation
            setShowDeleteModal(true);
            setModalMessage("Are you sure that you want to delete these items?");
            setModalConfirmAction(() => () => deleteSelectedItems(selectedItems));
        }
    };

    const handleUpdateItems = () => {
        if (selectedItemsForUpdate.length === 0) {
            setShowUpdateModalNoItems(true); 
            setModalMessage("You need to select items from the list before you can make your updates");
            setModalConfirmAction(null);
            setSelectedItemsForUpdate([]);
        } else {
            setShowUpdateModal(true);
        }
    };
    
    const handleQuantityChange = (itemId, value) => {
        setUpdatedQuantities(prevQuantities => ({ ...prevQuantities, [itemId]: value }));
    };
    
    const updateSelectedItems = () => {
        const updatePromises = selectedItemsForUpdate.map(item =>
            axios.put(
                `${BASE_URL}menu/item/${item.id}/update/`,
                {
                    title: item.title,
                    name: item.name,
                    price: item.price,
                    quantity: updatedQuantities[item.id] || item.quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
        );
    
        Promise.all(updatePromises)
            .then(() => {
                // Fetch updated cart items
                return axios.get(`${BASE_URL}menu/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
            })
            .then(response => {
                setCartItems(response.data);
                setShowUpdateModal(false);
                setShowUpdateSuccessModal(true);
            })
            .catch(error => {
                console.error('Error updating quantities:', error);
            });
    };
    

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdatedQuantities({});
    };
 
    const deleteSelectedItems = async (selectedItems) => {
        try {
            // Delete each selected item
            for (const item of selectedItems) {
                await axios.delete(`${BASE_URL}menu/item/${item.id}/delete/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
            }
    
            // Fetch updated cart items
            const response = await axios.get(`${BASE_URL}menu/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setCartItems(response.data);
    
            // Show success message when all selected items are deleted
            setModalMessage("Your items have been successfully deleted from your menu");
            setModalConfirmAction(null);
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    }; 
     
    const handleCheckboxChange = (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedCartItems);

        const selectedItems = updatedCartItems.filter(item => item.selected);
        setSelectedItemsForUpdate(selectedItems);
    };
    

    return (
    <div className="MenuItemSummary-container container-fluid">
        <div className="MenuItemSummary-header text-center container-fluid">
            <h1>Menu Summary!</h1>
        </div>
        <div className="MenuItemSummary-instructions text-center container-fluid">
            <p>
            <span id='MenuItemSummary-auth-text'>You are signed in -- <Link id='Auth-text-link' to="#" onClick={handleLogoutAndNavigate}>(logOut)</Link></span><br />
            Welcome to the menu summary, where you can view your items and delete unwanted items from the menu!<br />
            To change the items in your Cart, just select any items from the list and then press the <strong><em>"Delete"</em></strong> OR <strong><em>"Update"</em></strong> button at the bottom of this page.<br />
            If you are saticfied with your menu, then note down your summay and had back to to the menu page by clicking on the <strong><em>"Confirm Order"</em></strong> button.<br />
            When we have added an online payment method, you will be able to "Checkout" your items and reserve your dinner in advanced together with your booking.<br />
            <strong>Enjoy you meal!</strong><br />
            </p>
        </div>
        <div className="MenuItemSummary-items container-fluid" title="Scroll down for more items">
            {/* Display selected items */}
            <ol>
                {cartItems.map((item, index) => (
                <li key={index}>
                    <span className="item-title">{item.title}:</span> <span className="item-name">{item.name}</span><br />
                    {item.description}<br/>
                    Price: ${item.price} -- Quantity: {item.quantity} -- Select-item <input
                    className='check-box'
                    type="checkbox"
                    checked={item.selected || false}  // Ensure selected property exists and default to false
                    onChange={() => handleCheckboxChange(item.id)} 
                    />
                </li>
            ))}
            </ol>
        </div>
        <div className="MenuSummary-button-wrapper-update">
            <div className="MenuItemSummary-total">
                Sum: <span id="Total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="MenuSummary-button" id="MenuSummary-Update" onClick={handleUpdateItems}>
                Update Items
            </button>
        </div>
        <div className='MenuSummary-button-wrapper-delete-confirm'>
            <button className="MenuSummary-button" id="MenuSummary-Home" onClick={handleConfirm}>
                Accept Items
            </button>
            <button className="MenuSummary-button" id="MenuSummary-Delete" onClick={handleDeleteItems}>
                Delete Items
            </button>
        </div>
        <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Accept Items</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Order text-center'>
                 Are you sure that you are saticfied with your Menu and that you want to leave this page?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOrderModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseAndNavigate}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Delete text-center'>
                {modalMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Close
                </Button>
                {modalConfirmAction && (
                <Button variant="danger" onClick={() => {
                    modalConfirmAction();
                }}>
                    Yes
                </Button>
                )}
            </Modal.Footer>
        </Modal>
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Update Quantities</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Update-Quantities'>
                {selectedItemsForUpdate.map((item, index) => (
                    <div key={index}>
                        <span className="item-title">{item.title}:</span> <span className="item-name">{item.name}</span><br />
                        Quantity: <input
                            type="number"
                            value={updatedQuantities[item.id] || item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            min="1"
                            max="500"
                        />
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdateModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateSelectedItems}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showUpdateModalNoItems} onHide={() => setShowUpdateModalNoItems(false)}>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title>Update Items</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Update text-center'>
                You need to select items from the list before you can make your updates.
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="secondary" onClick={() => setShowUpdateModalNoItems(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showUpdateSuccessModal} onHide={() => setShowUpdateSuccessModal(false)}>
            <Modal.Header closeButton className='d-flex justify-content-center'>
                <Modal.Title>Update Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Update text-center'>
                Your items have been successfully updated.
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={() => setShowUpdateSuccessModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)}>
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
        <Modal show={showLogoutConfirmModal} onHide={handleLogoutCloseModal}>
            <Modal.Header closeButton className='d-flex justify-content-center'>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                 Are you sure that you want to log out and leave this page?
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="primary" onClick={handleLogoutConfirmNavigation}>
                    OK
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
    </div>
  );
};
export default MenuItemSummaryTemplate;