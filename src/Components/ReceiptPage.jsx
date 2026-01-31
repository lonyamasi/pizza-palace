import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/receipt.css';

const ReceiptPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No order found.</p>;

  const { orders, summary } = state;

  const handlePrint = () => window.print();
  const handleNewOrder = () => navigate('/');

  return (
    <div className="receipt-container">
      <h2>Order Receipt</h2>
      <div className="receipt-items">
        {orders.map((item, index) => (
          <div key={index} className="receipt-item">
            <p><strong>Size:</strong> {item.size}</p>
            <p><strong>Toppings:</strong> {item.toppings.join(', ')}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Item Total:</strong> KES {(summary.items[index].price).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="receipt-summary">
        <p><strong>Subtotal:</strong> KES {summary.subtotal.toFixed(2)}</p>
        <p><strong>GST:</strong> KES {summary.gst.toFixed(2)}</p>
        <p><strong>Total:</strong> KES {summary.total.toFixed(2)}</p>
      </div>
      <div className="receipt-actions">
        <button onClick={handleNewOrder}>New Order</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default ReceiptPage;