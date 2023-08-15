import React from 'react';
import '../styles/MenuItemSummaryTemplate.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/menu/';

const MenuItemSummaryTemplate = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); 
    const [modalConfirmAction, setModalConfirmAction] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${BASE_URL}`, {
                    headers: {
                        Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
                    },
        });
            setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
    };

    fetchCartItems();
  }, []);

    const navigate = useNavigate();

    const handleCloseAndNavigate = () => {
        setShowOrderModal(false);
    // Navigate back to the menu page
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
     

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };
 
    const deleteSelectedItems = async (selectedItems) => {
        try {
            // Delete each selected item
            for (const item of selectedItems) {
                await axios.delete(`${BASE_URL}item/${item.id}/delete/`, {
                    headers: {
                        Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
                    },
                });
            }
    
            // Fetch updated cart items
            const response = await axios.get(`${BASE_URL}`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
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
    };
    

    return (
    <div className="MenuItemSummary-container container-fluid">
        <div className="MenuItemSummary-header text-center container-fluid">
            <h1>Menu Summary!</h1><hr />
        </div>
        <div className="MenuItemSummary-instructions text-center container-fluid">
            <p>Welcome to the menu summary, where you can view your items and delete unwanted items from the menu!<br />
            To change the items in your Cart, just select any items from the list and then press the <strong><em>"Delete"</em></strong> OR <strong><em>"Update"</em></strong> button at the bottom of this page.<br />
            If you are saticfied with your menu, then note down your summay and had back to to the menu page by clicking on the <strong><em>"Confirm Order"</em></strong> button.<br />
            When we have added an online payment method, you will be able to "Checkout" your items and reserve your dinner in advanced together with your booking.<br />
            <strong>Enjoy you meal!</strong>
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
                Total:
            </div>
            <button className="MenuSummary-button" id="MenuSummary-Update">
                Update
            </button>
        </div>
        <div className='MenuSummary-button-wrapper-delete-confirm'>
            <button className="MenuSummary-button" id="MenuSummary-Home" onClick={handleConfirm}>
                Confirm Order
            </button>
            <button className="MenuSummary-button" id="MenuSummary-Delete" onClick={handleDeleteItems}>
                Delete Items
            </button>
        </div>
        <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Order</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Order'>
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
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className='Confirm-Menu-Delete'>
                {modalMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Close
                </Button>
                {modalConfirmAction && (
                <Button variant="danger" onClick={() => {
                    modalConfirmAction();
                    deleteSelectedItems();
                }}>
                    Yes
                </Button>
                )}
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default MenuItemSummaryTemplate;