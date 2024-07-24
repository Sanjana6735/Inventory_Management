import React, { useState } from 'react';
import '../styles/ProductForm.css';
import { useProductContext } from "../hooks/useProductContext";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
const ProductForm = () => {
  const { dispatch } = useProductContext();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const {user} = useAuthContext()
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";

  const handleImageUpload2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      setImage(res.data.secure_url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, quantity, price, category, image };
    if(!user)
    {
      setError("You must log in");
      return
    }
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
         },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setName('');
        setQuantity('');
        setPrice('');
        setCategory('');
        setImage('');
        setError(null);
        dispatch({ type: 'CREATE_PRODUCT', payload: json });
      }
    } catch (err) {
      setError(err.message);
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
      <label>Product Quantity:</label>
      <input
        type="text"
        onChange={(e) => setQuantity(e.target.value)}
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
      <label>Product Image:</label>
      <input
        type="file"
        onChange={handleImageUpload2}
      />
      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
