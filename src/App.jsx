
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './Components/Orderform';
import OrderSummary from './Components/ordersummary';
import ReceiptPage from './Components/ReceiptPage'; // You'll create this

const App = () => {
  const [orders, setOrders] = useState([]);

  return (
    <Router>
      <div>
        <h1>Pizza Palace</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <OrderForm setOrders={setOrders} />
                <OrderSummary orders={orders} />
              </>
            }
          />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
