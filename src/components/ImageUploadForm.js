import React, { useState } from 'react';
import { CloudinaryContext, Image, Transformation } from '../cloudinaryConfig';

const handleImageUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'Original');
      formData.append('folder', 'react_app_ourmenu'); // Specify the folder name here
  
      const result = await fetch(
        // Add code to this variable 
        // to Upload the image to Cloudinary if needed for other purposes in feature enhancements
      );
  
      const data = await result.json();
      console.log('Uploaded image URL:', data.secure_url);
    }
  };
  