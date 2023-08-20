import React, { useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/menuItemTemplate.css';
import menuData from './menuData';
import MenuItemDetails from './MenuItemDetails';
import MenuItemNotFound from './MenuItemNotFound';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'https://fastfood-drf-dfd5756f86e9.herokuapp.com/api/menu/';

const MenuItemTemplate = ({ updateSummary }) => {
  const [quantityInputs, setQuantityInputs] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('none'); // Tracks the active modal

  const navigate = useNavigate();
  const { title } = useParams();
  const menuItem = menuData.find((item) => item.dropdownTitle === title);

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
      setModalType('noSelectedItems');
      setShowModal(true);
    } else {
      setModalType('selectedItems'); // Set the modal type to show selected items
      setShowModal(true);
    }
  };
  
  const handleAddItemsToCart = () => {
    const selectedItems = Object.keys(checkedItems).filter((item) => checkedItems[item]);
    const selectedQuantities = Object.keys(quantityInputs).reduce((acc, itemName) => {
      if (checkedItems[itemName]) {
        acc[itemName] = quantityInputs[itemName];
      }
      return acc;
    }, {});
  
    if (selectedItems.length === 0) {
      setModalType('noSelectedItems');
    } else {
      Axios.post(
        `${BASE_URL}items/create/`,
        { items: selectedItems, quantities: selectedQuantities },
        {
          headers: {
            Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          setModalType('success');
          setCartItems((prevCartItems) => [...prevCartItems, ...selectedItems]);
          updateSummary(selectedItems.length);
        })
        .catch((error) => {
          setModalType('error');
        });
    }
  
    setCheckedItems({});
    setQuantityInputs({});
    setShowModal(false);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('none');
  };

  const handleCartModal = () => {
    setShowModal(false);
    navigate('/summary', { state: { cartItems } });
  };

  return (
    <div className="Template-menu-item-template-container">
<div className="Template-logo"></div>
      <div className="row">
        <div className="col-12 text-center MenuItemTemplate-heading">
          <h1>{menuItem.dropdownTitle} <hr /></h1>
        </div>
        <div className="row">
          <div className="col-12 text-center MenuItemTemplate-text">
            <p>Welcome!<br />
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
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'success'
              ? 'Success'
              : modalType === 'error'
              ? 'Error'
              : modalType === 'noSelectedItems'
              ? 'No Selected Items'
              : 'Cart Items'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'success' ? (
            <p>Your menu items have successfully been added to your cart.</p>
          ) : modalType === 'error' ? (
            <p>Something went wrong! Please contact support at +46-123456789 for assistance.</p>
          ) : modalType === 'noSelectedItems' ? (
            <p>You need to select items from the list before you can use this function.</p>
          ) : modalType === 'selectedItems' ? (
            <div>
              {Object.keys(checkedItems).map((itemName, index) => (
                <div key={index}>
                  <p>{itemName}</p>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={quantityInputs[itemName] || ''}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (newValue >= 1) { // Ensure the value is not negative or zero
                        setQuantityInputs((prevQuantityInputs) => ({
                          ...prevQuantityInputs,
                          [itemName]: newValue,
                        }));
                      }
                    }}
                    min="1" // Set the minimum value to 1
                    max="500"
                  />

                </div>
              ))}
            </div>
          ) : null}
          
        </Modal.Body>
        <Modal.Footer>
          {modalType === 'selectedItems' && (
            <div>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddItemsToCart}>
                Add Items to Cart
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
    </div>
  );
};

export default MenuItemTemplate;
