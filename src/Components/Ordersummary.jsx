// // 

// import React, { useEffect, useState } from 'react';
// import './CSS/ordersummary.css';

// const OrderSummary = ({ orders }) => {
//   const [summary, setSummary] = useState(null);
//   const [confirmation, setConfirmation] = useState('');

//   // 🔍 Preview totals without saving to DB
//   useEffect(() => {
//     if (!orders || orders.length === 0) {
//       setSummary(null);
//       return;
//     }

//     const payload = orders.map(order => ({
//       size: order.size,
//       toppings: order.toppings,
//       quantity: order.quantity
//     }));

//     const fetchPreview = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/orders/preview', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });

//         const data = await res.json();
//         setSummary(data);
//       } catch (err) {
//         console.error('Error fetching preview:', err);
//       }
//     };

//     fetchPreview();
//   }, [orders]);

//   // Submit order to DB
//   const handleSubmit = async () => {
//     if (!orders || orders.length === 0) return;

//     const payload = orders.map(order => ({
//       size: order.size,
//       toppings: order.toppings,
//       quantity: order.quantity
//     }));

//     try {
//       const res = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();
//       setSummary(data); // Update with confirmed totals
//       setConfirmation('✅ Order submitted successfully!');
//     } catch (err) {
//       console.error('Error submitting order:', err);
//       setConfirmation('❌ Failed to submit order. Please try again.');
//     }
//   };

//   const subtotal = summary?.subtotal || 0;
//   const gst = summary?.gst || 0;
//   const total = summary?.total || 0;

//   return (
//     <div className="ordersummary-body">
//       <h2>Order Summary</h2>
//       <div className="summary-details">
//         <label>Sub Total <input type="number" value={subtotal} readOnly /></label>
//         <label>GST <input type="number" value={gst} readOnly /></label>
//         <label>Total <input type="number" value={total} readOnly /></label>
//       </div>
//       <button className="submit-btn" onClick={handleSubmit}>SUBMIT ORDER</button>
//       {confirmation && <p className="confirmation-message">{confirmation}</p>}
//     </div>
//   );
// };

// export default OrderSummary;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/ordersummary.css';

const OrderSummary = ({ orders }) => {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  // 🔍 Preview totals without saving to DB
  useEffect(() => {
    if (!orders || orders.length === 0) {
      setSummary(null);
      return;
    }

    const payload = orders.map(order => ({
      size: order.size,
      toppings: order.toppings,
      quantity: order.quantity
    }));

    const fetchPreview = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('Error fetching preview:', err);
      }
    };

    fetchPreview();
  }, [orders]);

  // ✅ Submit order to DB and redirect to receipt
  const handleSubmit = async () => {
    if (!orders || orders.length === 0) return;

    const payload = orders.map(order => ({
      size: order.size,
      toppings: order.toppings,
      quantity: order.quantity
    }));

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      navigate('/receipt', { state: { orders, summary: data } });
    } catch (err) {
      console.error('Error submitting order:', err);
      alert('❌ Failed to submit order. Please try again.');
    }
  };

  const subtotal = summary?.subtotal || 0;
  const gst = summary?.gst || 0;
  const total = summary?.total || 0;

  return (
    <div className="ordersummary-body">
      <h2>Order Summary</h2>
      <div className="summary-details">
        <label>Sub Total <input type="number" value={subtotal} readOnly /></label>
        <label>GST <input type="number" value={gst} readOnly /></label>
        <label>Total <input type="number" value={total} readOnly /></label>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>SUBMIT ORDER</button>
    </div>
  );
};

export default OrderSummary;