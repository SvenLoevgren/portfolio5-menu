import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/menu/';

const MenuItemTemplateApiEndpoint = () => {
  const [showModal, setShowModal] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      console.log('GET response:', response.data);

      const dataWithoutKeys = response.data.map(item => {
        const { pk, ...rest } = item;
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

      setPostSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setPostSuccess(false);
    }
  };

  const handlePostClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    fetchData();
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          {cartItems.map((item, index) => (
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
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to create a menu of the selected items?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              No
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {postSuccess && (
        <Modal show={postSuccess} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your items have been added.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MenuItemTemplateApiEndpoint;
