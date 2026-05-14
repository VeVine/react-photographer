import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="filter-container">
      {categories.map(category => (
        <button
          key={category.id}
          className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;