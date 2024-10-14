import React, { useEffect, useState } from 'react';
import { useProductContext } from '../hooks/useProductContext';
import  "../styles/Dashboard.css"; // Make sure to import the CSS

const Dashboard = () => {
  const { products } = useProductContext();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (products) {
      setTotalProducts(products.length);
      setTotalQuantity(products.reduce((acc, product) => acc + product.quantity, 0));
      setTotalPrice(products.reduce((acc, product) => acc + product.price, 0));
    }
  }, [products]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <p>Total Products</p>
          <strong>{totalProducts}</strong>
        </div>
        <div className="stat-card">
          <p>Total Quantity</p>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="stat-card">
          <p>Total Price</p>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
