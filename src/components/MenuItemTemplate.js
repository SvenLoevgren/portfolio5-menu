import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/menuItemTemplate.css';
import menuData from './menuData';
import MenuItemDetails from './MenuItemDetails';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MenuItemNotFound from './MenuItemNotFound';

const MenuItemTemplate = () => {
  const { title } = useParams();
  const menuItem = menuData.find((item) => item.dropdownTitle === title);

  if (!menuItem) {
    return <MenuItemNotFound />;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleCheckboxChange = (name) => { // Update parameter name here
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name], // Update parameter name here
    }));
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
            When you are saticfied with your choices, then press the "Add to cart" button.<br />
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
                name={item.name} // Pass the correct prop name here
                price={item.price}
                checked={checkedItems[item.name]} // Pass the correct prop name here
                onCheckboxChange={() => handleCheckboxChange(item.name)} 
                description={item.description} // Pass description as a prop
                imageUrl={item.imageUrl} // Pass imageUrl as a prop
              />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button className="Template-cancel-button">Cancel</button>
          <button className="Template-add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemTemplate;