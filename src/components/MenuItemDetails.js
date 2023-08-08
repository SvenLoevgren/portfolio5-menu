import React from 'react';
import { Link } from 'react-router-dom';

const MenuItemDetails = ({ name, price, checked, onCheckboxChange, description, imageUrl, addToCart }) => {
  return (
    <div className="Template-menu-item row">
      <div className="col-md-4 col-12 Template-item-name">{name}</div>
      <div className="Template-price">{price}</div>
      <div className="Template-checkbox">
        Select Item <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
      </div>
      <div className="col-md-1 col-12">
        <div className="MenuItemDetails-link">
          <Link to={`/details/${encodeURIComponent(name)}`}>Details</Link>
        </div>
      </div>
      <div className="col-md-1 col-12">
        <button
          className={`Template-item-details-button ${checked ? 'selected' : ''}`}
          onClick={() => {
            onCheckboxChange();
            addToCart(checked, name); // Call the addToCart function
          }}
        >
          {checked ? 'Remove' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetails;