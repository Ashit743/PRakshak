import React from 'react';
import './mealCards.css'
 
const LunchMenu = ({ lunchItems }) => {
  return (
<div className='menu-container'>
<h2>Lunch Menu</h2>
<ul>
        {Object.keys(lunchItems).map((item, index) => (
<li key={index}>
<strong>{item}</strong>: {lunchItems[item]}
</li>
        ))}
</ul>
</div>
  );
};
 
export default LunchMenu;