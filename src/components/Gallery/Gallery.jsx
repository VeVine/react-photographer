import React, { useState } from 'react';
import GalleryItem from './GalleryItem';
import CategoryFilter from './CategoryFilter';
import { categories } from '../../data/categories';
import photos from '../../data/photos';
import './gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  return (
    <section className="gallery-section">
      <h2>Мои работы</h2>
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      
      <div className="gallery-grid">
        {filteredPhotos.map(photo => (
          <GalleryItem key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;