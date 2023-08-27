import React from 'react';
import { Image } from 'cloudinary-react'; // Fix the import statement

const DisplayImage = ({ imageName }) => {
    return (
        <div>
            <h2>Menu Item</h2>
            <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} // Specify your cloud_name here
            publicId={imageName} // Use the imageName prop as the publicId
            width="300" // Set the desired width of the image
            crop="fill" // Set the image crop mode (e.g., scale, fill, etc.)
            alt="Menu Item"
            />
        </div>
    );
};

export default DisplayImage;


