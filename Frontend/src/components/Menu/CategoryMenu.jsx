import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import FoodItem from './FoodItem';


const CategoryMenu = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    const element = document.getElementById(`id-${index}`);
    const offset = -110;
    const scrollToPosition = element.offsetTop + offset;
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth'
    });
   
  };

  const updateSelectedCategoryByScroll = () => {
    const categoriesElements = document.querySelectorAll('.items-div');

    categoriesElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 80) {
        setSelectedCategory(index);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateSelectedCategoryByScroll);
    return () => {
      window.removeEventListener('scroll', updateSelectedCategoryByScroll);
    };
  }, []); 
  useEffect(() => {
    if (!items || items.length === 0) {
      
    }
  }, [items]);

  return (
    <>
      <div className="main-content">
        <div className="left-body">
          <h2 className="menu-h2">Menu</h2>
          {items && items.length > 0 ? (
            items.map((category, index) => (
              <CategoryItem
                key={index}
                src={category.category_icon}
                name={category.category_title}
                size={category.food_item.length}
                selected={index === selectedCategory}
                onClick={() => handleCategoryClick(index)}
              />
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
        <div className="right-body">
         
        </div>
        <div className="main-div">
          {items && items.length > 0 && items.map((category, index) => (
            <div key={index} className="items-div" id={`id-${index}`}>
              <h2 className="items-h2">{category.category_title}</h2>
              <p className="items-p">{category.category_description}</p>
              <div className="items-boxes">
                {category.food_item.map((food, foodIndex) => (
                  <FoodItem key={foodIndex} item={food} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default CategoryMenu;
