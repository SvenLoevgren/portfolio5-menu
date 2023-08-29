import React, { useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/menuItemTemplate.css';
import menuData from './menuData';
import MenuItemDetails from './MenuItemDetails';
import MenuItemNotFound from './MenuItemNotFound';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from './AuthContext';

const BASE_URL= "https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/"

const MenuItemTemplate = () => {
    const [quantityInputs, setQuantityInputs] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const {isAuthenticated, logout } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('none'); 
    const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] = useState(false);

    const navigate = useNavigate();
    const { title } = useParams();
    const menuItem = menuData.find((item) => item.dropdownDetails.find((detail) => detail.title === title));
    
    if (!menuItem) {
        return <MenuItemNotFound />;
    }

    const handleCheckboxChange = (name) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: !prevCheckedItems[name],
        }));
    
        if (!checkedItems[name]) {
            setQuantityInputs((prevQuantityInputs) => ({
                ...prevQuantityInputs,
                [name]: 1,
        }));
        }
    };  

    const handleCancelClick = () => {
        navigate('/');
    };

    const handleAddToCart = () => {
        const selectedItems = Object.keys(checkedItems).filter(
            (itemName) => checkedItems[itemName]
        );

        if (selectedItems.length === 0) {
            setModalType('noSelectedItems'); // Set the modal type to show NO selected items
            setShowModal(true);
        } else {
            setModalType('selectedItems'); // Set the modal type to show selected items
            setShowModal(true);
        }
    };
  
    const handleAddItemsToCart = () => {
        // fetches data from menuData.js to match drf models.py data
        const selectedItems = Object.keys(checkedItems).filter((item) => checkedItems[item]);
        const postData = selectedItems.map((itemName) => {
            let foundItem = null;
                menuData.forEach((menuCategory) => {
            const menuItem = menuCategory.dropdownDetails.find((detail) => detail.name === itemName);
                if (menuItem) {
                    foundItem = menuItem;
                }
        });
    
        if (foundItem) {
            return {
                title: foundItem.title, 
                name: foundItem.name,
                description: foundItem.description,
                price: foundItem.price,
                quantity: quantityInputs[itemName] || 1,
            };
        }
        
        return null;
            }).filter(item => item !== null);
    
        if (postData.length === 0) {
            setModalType('noSelectedItems');
            setShowModal(true);
        } else {
            Axios.post(
               `${BASE_URL}menu/items/create/`,
            postData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }
            )
            .then((response) => {
                setModalType('success');
                setCartItems((prevCartItems) => [...prevCartItems, ...selectedItems]);
            })
            .catch((error) => {
                setModalType('error');
          });
          }
    
        setCheckedItems({});
        setQuantityInputs({});
        setShowModal(true);
    };
  
    const handleCloseModal = () => {
        setShowModal(false);
        setModalType('none');
    };

    const handleCartModal = () => {
        setShowModal(false);
        navigate('/summary', { state: { cartItems } });
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirmationModal(true)
    }

    const handleLogoutConfirmationClick = () => {
        logout();
        navigate('/');
    }

    const handleNotAthenticated = () => {
        navigate('/')
    }

    if (!isAuthenticated()) {
        return (
            <div  className='text-row container-fluid'>
                <div className='text-center'>
                    <h1>Warning!<hr /></h1>
                    <p>You need to be signed in, to view this page!<br />
                    Click on the button below to get navigated back to our home page,<br />
                    <strong>Where you can sign in again!</strong></p>
                </div>
                <div className='text-center'>
                    <Button variant="primary" onClick={handleNotAthenticated}>
                        OK
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="Template-menu-item-template-container">
            <div className="Template-logo"></div>
            <div className="row">
                <div className="col-12 text-center MenuItemTemplate-heading">
                    <h1>{title}</h1>
                </div>
                <div className="row">
                    <div className="col-12 text-center MenuItemTemplate-text">
                        <p>
                        <span id='MenuItemSummary-auth-text'>You are signed in -- <Link id='Auth-text-link' to="#" onClick={handleLogoutClick}>(logOut)</Link></span><br />
                        Welcome!<br />
                        On this page you can select your meal and add items to your Cart.<br />
                        Choose your items by clicking on the <strong>"select item"</strong> checkbox.<br />
                        You can find all items by Scrolling in the list <strong>below</strong><br />
                        When you are satisfied with your choices, then press the<br />
                        <strong>"Add to cart"</strong> button.<br />
                        To cancel all selections just press the "Cancel" button or close this window.
                        </p>
                    </div>
                </div>
            </div>
            {/*Shows fetched data from drf*/}
            <div className="container-fluid" id='Template-Item-containers' title="Scroll for more items">
                <div className="row">
                    {menuItem.dropdownDetails.map((item, index) => (
                    <div key={index} className="col-md-4 col-12">
                        <MenuItemDetails
                        name={item.name}
                        price={item.price}
                        checked={checkedItems[item.name] || false}
                        onCheckboxChange={() => handleCheckboxChange(item.name)}
                        description={item.description}
                        />
                    </div>
                    ))}
                </div>
            </div>
            {/*user POST interaction buttons*/}
            <div className="row">
                <div className="col-12">
                    <button className="Template-cancel-button" onClick={handleCancelClick}>
                        Cancel
                    </button>
                    <button className="Template-add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            {/*Modal appearens - depending on user action*/}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'success'
                            ? 'Success'
                            : modalType === 'error'
                            ? 'Error'
                            : modalType === 'noSelectedItems'
                            ? 'No Selected Items'
                            : 'Cart Items'
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center item-modals' >
                    {modalType === 'success' ? (
                            <p>Your menu items have successfully been added to your cart.</p>
                        ) : modalType === 'error' ? (
                            <p>Something went wrong! Please contact support at +46-123456789 for assistance.</p>
                        ) : modalType === 'noSelectedItems' ? (
                            <p>You need to select items from the list before you can use this function.</p>
                        ) : modalType === 'selectedItems' ? (
                        <div>
                            {/*User input fields for POST to drf*/}
                            {Object.keys(checkedItems).map((itemName, index) => (
                                <div key={index} className='Selected-Items-modal-item-row'>
                                    <p>{itemName}</p>
                                    <label>Quantity:</label>
                                    <input
                                    type="number"
                                    value={quantityInputs[itemName] || ''}
                                    onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                        // Ensure the value is not negative or zero
                                        if (newValue >= 1) { 
                                            setQuantityInputs((prevQuantityInputs) => ({
                                                ...prevQuantityInputs,
                                                [itemName]: newValue,
                                            }));
                                        }
                                    }}
                                    // Set the minimum value to 1
                                    min="1" 
                                    max="500"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}          
                </Modal.Body>
                {/*User confirm buttons for POST to drf*/}
                <Modal.Footer className='d-flex justify-content-center'>
                    {modalType === 'selectedItems' && (
                        <div>
                            <Button variant="primary" onClick={handleAddItemsToCart}>
                                Add Items to Cart
                            </Button>
                            <Button variant="secondary" className='Template-Modal-Cancel-button' onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </div>
                    )}
                    {(modalType === 'error' || modalType === 'noSelectedItems' || modalType === 'success') && (
                        <Button variant="primary" onClick={modalType === 'success' ? handleCartModal : handleCloseModal}>
                            OK
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
            {/*User Logout*/}
            <Modal show={showLogoutConfirmationModal} onHide={() => setShowLogoutConfirmationModal(false)}>
                <Modal.Header closeButton className='d-flex justify-content-center'>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    Are you sure that you want to log out and leave this page?
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={handleLogoutConfirmationClick}>
                        OK
                    </Button>
                    <Button className='Template-Modal-Cancel-button' variant="primary" onClick={() => setShowLogoutConfirmationModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MenuItemTemplate;
