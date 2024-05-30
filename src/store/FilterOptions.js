import React from 'react';

const FilterOptions = ({ sortOrder, onToggleSortOrder }) => {
  return (
    <div className="filter-options">
      <button className="sort-button" onClick={onToggleSortOrder}>
        배달료순 {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default FilterOptions;
