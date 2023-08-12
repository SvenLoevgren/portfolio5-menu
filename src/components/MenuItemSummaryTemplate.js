import React from 'react';
import '../styles/MenuItemSummaryTemplate.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MenuItemSummaryTemplate = () => {
  const token = process.env.REACT_APP_AUTH_TOKEN;
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/menu/cart/', {
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
    setShowModal(false);
    // Navigate back to the menu page
    navigate('/'); 
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log('Rendering MenuItemSummaryTemplate');
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
      <div className="MenuItemSummary-items container-fluid">
        {/* Display selected items */}
        <ol>
          {console.log('cartItems:', cartItems)}
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title}: {item.name}<br/>
              {item.description}<br/>
              Price: ${item.price} -- Quantity: {item.quantity} -- Select-item <input type="checkbox" />
            </li>
          ))}
          
          {/* Duplicate the list items with the same parameters */}
          {cartItems.map((item, index) => (
            <li key={index + cartItems.length}>
              {item.title}: {item.name}<br/>
              {item.description}<br/>
              Price: ${item.price} -- Quantity: {item.quantity} -- Select-item <input type="checkbox" />
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
        <button className="MenuSummary-button" id="MenuSummary-Delete">
          Delete Items
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
      <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         Are you sure that you are saticfied with you menu?
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={handleCloseAndNavigate}>
        Confirm
      </Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuItemSummaryTemplate;