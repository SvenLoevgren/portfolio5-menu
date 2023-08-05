import React from 'react';

const MenuItemDetails = ({ item, price }) => {
  return (
    <div className="row Template-menu-item">
      <div className="col-md-3 col-12 Template-item-name">{item}</div>
      <div className="col-md-3 col-12 Template-price">{price}</div>
      <div className="col-md-3 col-12">
        <input type="checkbox" />
        <a className="Template-details-link" href={`/details/${item.replace(' ', '').toLowerCase()}`}>
          Details
        </a>
      </div>
      <div className="col-md-3 col-12">
        <button className="Template-cancel-button">Cancel</button>
        <button className="Template-add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuItemDetails;
