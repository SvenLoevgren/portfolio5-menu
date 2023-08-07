import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuItemSummaryTemplate.css';

const MenuItemSummaryTemplate = () => {
  return (
    <div className="MenuItemSummary-container">
      <div className="MenuItemSummary-header">
        <h1>Menu Summary!</h1><hr />
      </div>
      {/* Display selected items */}
      {/* ... */}
      <div className="MenuSummary-button-wrapper">
        <button className="MenuSummary-button" id='MenuSummary-Delete'>Delete Items</button>
        <button className="MenuSummary-button" id='MenuSummary-Home'>Back To Menu</button>
      </div>
    </div>
  );
};

export default MenuItemSummaryTemplate;
