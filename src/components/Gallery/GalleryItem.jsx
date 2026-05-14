import React from 'react';
import { motion } from 'framer-motion';

const GalleryItem = ({ photo }) => {
  return (
    <motion.div 
      className="gallery-item"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="image-container">
        <div className="placeholder-image" />
      </div>
      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p>{photo.description}</p>
      </div>
    </motion.div>
  );
};

export default GalleryItem;