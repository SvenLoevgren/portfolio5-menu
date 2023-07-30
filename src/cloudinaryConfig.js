import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

const cloudinary = {
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
};

export { CloudinaryContext, Image, Transformation, cloudinary };


