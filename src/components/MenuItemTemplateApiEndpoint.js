import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/menu/';

const MenuItemTemplateApiEndpoint = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Change showModal to showConfirmModal
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);


  const fetchMenuItems = async () => {  // Change from fetchCartItems to fetchMenuItems
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      setMenuItems(response.data);  // Change from setCartItems to setMenuItems
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      console.log('GET response:', response.data);

      const dataWithoutKeys = response.data.map(item => {
        const { pk, created_at, updated_at, user_id, ...rest } = item;
        return rest;
      });

      const postResponse = await axios.post(
        `${BASE_URL}items/create/`,
        dataWithoutKeys,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('POST response:', postResponse.data);

      setShowSuccessModal(true);;
    } catch (error) {
      console.error('Error:', error);
      console.log('POST error response:', error.response.data);
    }
  };

  const handlePostClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    fetchData();
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Close the success modal
    window.location.reload();
  };

  return (
    <div className="container text-center py-5">
      <div>
        <h1 className="mb-4">API Checkpoint</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <p>Here is my Item List</p>
      </div>
      <div>
        <ol>
         {menuItems.map((item, index) => (
            <li key={index}>
              <span className="item-title">{item.title}:</span> <span className="item-name">{item.name}</span><br />
              {item.description}<br/>
              Price: ${item.price} -- Quantity: {item.quantity}
            </li>
          ))}
        </ol>
        </div>
      <div>
        <button className="btn btn-primary" onClick={handlePostClick}>
          POST
        </button>
      </div>
      {showConfirmModal && (
        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to create a menu of the selected items?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSuccessModal}>
              No
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal show={showSuccessModal} onHide={handleCloseConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your items have been added.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MenuItemTemplateApiEndpoint;