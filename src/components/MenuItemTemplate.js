import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/menuItemTemplate.css';
import menuData from './menuData';
import MenuItemDetails from './MenuItemDetails';
import MenuItemNotFound from './MenuItemNotFound';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MenuItemTemplate = ({ updateSummary }) => {
  const navigate = useNavigate();
  const { title } = useParams();
  const menuItem = menuData.find((item) => item.dropdownTitle === title);

  if (!menuItem) {
    return <MenuItemNotFound />;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

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
    setCartItems((prevCartItems) => [...prevCartItems, ...selectedItems]);
    setCheckedItems({});
    setShowModal(true); // Show the modal after adding to cart
    updateSummary(selectedItems.length); // Update summary count
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };
  
  const handleCartModal = () => {
    const selectedItems = Object.keys(checkedItems).filter((itemName) => checkedItems[itemName]);
    setShowModal(false); // Close the modal
    navigate('/summary', { state: { cartItems: selectedItems } });
  };

  const totalItems = menuItem.dropdownDetails.length;
  const totalLargeScreens = 3;
  const totalSmallScreens = 1;
  const itemsPerPage = useMediaQuery('(max-width: 767px)') ? totalSmallScreens : totalLargeScreens;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      const handleChange = (event) => {
        setMatches(event.matches);
      };

      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }, [query]);

    return matches;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

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
            Choose your items by clicking on the "select item" checkbox.<br />
            If there are more items to select, you can find them via the next and previous buttons below.<br />
            When you are satisfied with your choices, then press the "Add to cart" button.<br />
            To cancel all selections just press the "Cancel" button or close this window.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button className="btn btn-primary mr-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <FaChevronLeft /> Previous
          </button>
          <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Item <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="container-fluid" id='Template-Item-containers'>
        <div className="row">
          {menuItem.dropdownDetails.slice(startIndex, endIndex).map((item, index) => (
            <div key={index} className="col-md-4 col-12">
              <MenuItemDetails
                name={item.name}
                price={item.price}
                checked={checkedItems[item.name]}
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
