import React from 'react';
import { Link } from 'react-router-dom';

const MenuItemDetails = ({ name, price, checked, onCheckboxChange, description, imageUrl }) => {
  return (
    <div className="Template-menu-item row">
      <div className="col-md-4 col-12 Template-item-name">{name}</div>
      <div className="Template-price">{price}</div>
      <div className="Template-checkbox">
        Select Item <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
      </div>
      <div className="col-md-1 col-12">
        <div className="MenuItemDetails-link">
          {/* Use the correct parameter name 'name' */}
          <Link to={`/details/${encodeURIComponent(name)}`}>Details</Link>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;
