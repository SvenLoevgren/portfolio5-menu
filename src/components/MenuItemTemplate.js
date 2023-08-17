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
  const [checkedItems, setCheckedItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleAddToCart = () => {
    const selectedItems = Object.keys(checkedItems).filter((itemName) => checkedItems[itemName]);

    Axios.post(
      `${BASE_URL}items/create/`,
      { items: selectedItems },
      { headers: { Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`},
       'Content-Type': 'application/json',
     }
    )
      .then((response) => {
        console.log('Items added to cart:', response.data);
      })
      .catch((error) => {
        console.error('Error adding items to cart:', error);
      });

    setCartItems((prevCartItems) => [...prevCartItems, ...selectedItems]);
    setCheckedItems({});
    setShowModal(true);
    updateSummary(selectedItems.length);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCartModal = () => {
    const selectedItems = Object.keys(checkedItems).filter((itemName) => checkedItems[itemName]);
    setShowModal(false);
    navigate('/summary', { state: { cartItems: selectedItems } });
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
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {cartItems.map((itemName, index) => (
              <li key={index}>{itemName}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className='Modal-Close-button'>
            Close this Window
          </Button>
          <Button variant="primary" onClick={handleCartModal} className='Modal-Select-button'>
            Add selected items
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuItemTemplate;
