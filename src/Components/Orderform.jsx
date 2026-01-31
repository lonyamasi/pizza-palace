
import React, { useState } from 'react';
import Size from "./Orderformcomponents/size";
import './CSS/OrderForm.css';
import Toppings from "./Orderformcomponents/Toppings";
import Order from "./Orderformcomponents/order";
import OrderItems from "./Orderformcomponents/orderitems";



const OrderForm = ({ setOrders }) => {
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [localOrders, setLocalOrders] = useState([]);

  const handleAddOrder = () => {
    const newOrder = { size, toppings, quantity };
    const updated = [...localOrders, newOrder];
    setLocalOrders(updated);
    setOrders(updated); // Send to App
    setSize('');
    setToppings([]);
    setQuantity(1);
  };

  const handleNextCustomer = () => {
    setLocalOrders([]);
    setOrders([]);
    setSize('');
    setToppings([]);
    setQuantity(1);
  };

  return (
    <div className='orderform-body'>
      <h2>Pizza Order</h2>
      <Size setSize={setSize} size={size} />
      <Toppings setToppings={setToppings} toppings={toppings} />
      <Order setQuantity={setQuantity} quantity={quantity} />
      <div className='button-container'>
        <button className='btn-add' onClick={handleAddOrder}>Add Order</button>
        <button className='btn-next' onClick={handleNextCustomer}>New Order</button>
      </div>
      <OrderItems orders={localOrders} />
    </div>
  );
};

export default OrderForm;