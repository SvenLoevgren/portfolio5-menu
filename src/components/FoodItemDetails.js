import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/foodItemDetails.css';
import menuData from './menuData';
import MenuItemNotFound from './MenuItemNotFound';
import { useAuth } from './AuthContext';
import Button from 'react-bootstrap/Button';

const FoodItemDetails = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    const { foodName } = useParams();
    const { isAuthenticated, logout } = useAuth();
    const menuItem = menuData.find((menu) => menu.dropdownDetails.some((item) => item.name === foodName));

    if (!menuItem) {
        return <MenuItemNotFound />;
    }

    const item = menuItem.dropdownDetails.find((item) => item.name === foodName);

    const handleClose = () => {
        navigate(-1);
    };

    const handleNotAthenticated = () => {
        logout();
        navigate('/');
    };
    // New prop used for authentication in AuthContext, due to Issues with reacts 'authenticated'
    if (!isAuthenticated()) {
        return (
            <div  className='text-row container-fluid'>
                <div className='text-center'>
                    <h1>Warning!<hr /></h1>
                    <p>You need to be signed in, to view this page!<br />
                    Click on the button below to get navigated back to our home page,<br />
                    <strong>Where you can sign in again!</strong></p>
                </div>
                <div className='text-center'>
                    <Button variant="primary" onClick={handleNotAthenticated}>
                        OK
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="FoodItemDetails-container">
            <div className="FoodItemDetails-header">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                />
                {!imageLoaded && <p>{item.name}</p>}
            </div>
            <div className="FoodItemDetails-description">
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
            </div>
            {/* Wrapper div for centering the button */}
            <div className="FoodItemDetails-button-wrapper">
                <div className="Food-close-button">
                    <button onClick={handleClose}>Close Window</button>
                </div>
            </div>
        </div>
    );
};

export default FoodItemDetails;
