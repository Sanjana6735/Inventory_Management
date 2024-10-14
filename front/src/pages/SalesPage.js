import React, { useState, useEffect } from 'react';
import { useProductContext } from '../hooks/useProductContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SalesPage = () => {
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext(); 
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCT', payload: data });
      } catch (error) {
        console.error('Error fetching products:', error);
        setMessage('Failed to fetch products.');
      }
    };

    if (!products) {
      fetchProducts();
    }
  }, [products, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage('You need to be logged in to add a sale.');
      return;
    }

    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Sale added successfully!');

        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: {
            _id: selectedProduct,
            quantity: products.find(product => product._id === selectedProduct).quantity - quantity,
          },
        });
      } else {
        const errorData = await response.json();
        setMessage(`Failed to add sale: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding sale:', error);
      setMessage('Failed to add sale.');
    }
  };

  return (
    <div>
      <h1>Add a Sale</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="" disabled>Select a product</option>
            {products && products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Available: {product.quantity})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Add Sale</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SalesPage;
