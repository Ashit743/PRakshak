import './mealCards.css'
import React from 'react';


 
const BreakfastMenu = ({ breakfastItems }) => {
  return (
<div className='menu-container'>
<h2>Breakfast Menu</h2>
<ul>
        {Object.keys(breakfastItems).map((item, index) => (
<li key={index}>
<strong>{item}</strong>: {breakfastItems[item]}
</li>
        ))}
</ul>
</div>
  );
};
 
export default BreakfastMenu;