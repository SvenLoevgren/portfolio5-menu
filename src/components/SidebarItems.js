import React from 'react';

const SidebarItems = ({ sidebarItems }) => {
  const handleItemClick = (item) => {
    // Implement navigation to the detailed page for the clicked item.
    console.log('Clicked on:', item);
  };

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarItems;
