import React from 'react';

const CategoryItem = ({ src, name, size, selected, onClick }) => {
  return (
    <div className={selected ? "item-categories selected-category" : "item-categories"} onClick={onClick}>
      <div className="category-details">
        <img src={src} alt="" className="category-image" />
        <p className="category-name">{name}</p>
      </div>
      <p className="number-of-items">{size}</p>
    </div>
  );
};

export default CategoryItem;
