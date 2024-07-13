import React, { useState } from 'react';
import '../styles/ProductForm.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setquantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, quantity, price, category };
    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName('');
      setquantity('');
      setPrice('');
      setCategory('');
      setError(null);
      console.log(json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>
      <label>Product Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Product quantity:</label>
      <input
        type="text"
        onChange={(e) => setquantity(e.target.value)}
        value={quantity}
      />
      <label>Product Price:</label>
      <input
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <label>Product Category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
