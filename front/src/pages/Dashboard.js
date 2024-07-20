import React, { useEffect, useState } from 'react';
import { useProductContext } from '../hooks/useProductContext';

const Dashboard = () => {
  const { products,dispatch} = useProductContext();
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
        <p><strong>Total Products:</strong> {totalProducts}</p>
        <p><strong>Total Quantity:</strong> {totalQuantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Dashboard;
