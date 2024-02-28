import './mealCards.css'
import React from 'react';
 
const DinnerMenu = ({ dinnerItems }) => {
  return (
<div  className='menu-container'>
<h2>Dinner Menu</h2>
<ul>
        {Object.keys(dinnerItems).map((item, index) => (
<li key={index}>
<strong>{item}</strong>: {dinnerItems[item]}
</li>
        ))}
</ul>
</div>
  );
};
 
export default DinnerMenu;