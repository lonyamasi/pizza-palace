import React from 'react';
import './CSS/ordersummary.css'

const OrderSummary = () => {
  return (
    <div className="ordersummary-body">
      <h2>Order Summary</h2>
      <div className="summary-details">
        <label>Sub Total <input type="number" id="price" value="0" readOnly /></label>
        <label>GST <input type="number" id="GST" value="0" readOnly /></label>
        <label>Total <input type="number" id="Total" value="0" readOnly /></label>
      </div>
      <button className="submit-btn">SUBMIT ORDER</button>
    </div>
  );
};

export default OrderSummary;

