import React, { useState } from 'react';
import '../CSS/order.css';

const Order = ({setQuantity, quantity}) => {
  const handleQuantityChange =(e)=>{
    setQuantity(e.target.value);
  }
  

  return (
    <div className="quantity-input">
      <label htmlFor='quantity'>Quantity: </label>
      <input 
        type="number" 
        id="quantity" 
        min="1" 
        value={quantity} 
        onChange={handleQuantityChange}
      />
    </div>
  );
};

export default Order;

