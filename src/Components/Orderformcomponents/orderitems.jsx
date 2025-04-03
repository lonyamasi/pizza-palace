import React from 'react';
import '../CSS/orderitems.css'

const OrderItems = ({orders }) => {
  return (
    <div className="order-summary">
      <h3>Order Item/s</h3>

      {orders.length === 0? (<p>No orders placed yet.</p>
      ) : (
        <ul>
            {orders.map((order,index) =>(
                <li key={index}>
                    <p><strong>Quantity:</strong>{order.quantity}</p>
                    <p><strong>Size:</strong>{order.size}</p>
                    <p><strong>Toppings:</strong>{order.toppings.length >0? order.toppings.join(', '): 'No toppings selected'}</p>
                    
                </li>
        
            ))}
        </ul>
        
        )}
    
    </div>
  );
};

export default OrderItems;
