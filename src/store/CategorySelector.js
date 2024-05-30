import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
