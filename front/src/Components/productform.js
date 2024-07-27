import React, { useState } from 'react';
import '../styles/ProductForm.css';
import { useProductContext } from "../hooks/useProductContext";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const ProductForm = () => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds the 5MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      setImage(res.data.secure_url);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !quantity || !price || !category || !image || !vendorName || !vendorEmail) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (isNaN(quantity) || isNaN(price)) {
      setError("Quantity and price must be numbers.");
      setLoading(false);
      return;
    }

    const product = { name, quantity, price, category, image, vendorName, vendorEmail };

    if (!user) {
      setError("You must log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to add product.");
      } else {
        setName('');
        setQuantity('');
        setPrice('');
        setCategory('');
        setImage('');
        setVendorName('');
        setVendorEmail('');
        setError(null);
        dispatch({ type: 'CREATE_PRODUCT', payload: json });
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>
      <label>Product Name:</label>
      <input
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Product Quantity:</label>
      <input
        type="number"
        placeholder="Enter quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
      <label>Product Price:</label>
      <input
        type="number"
        step="0.01"
        placeholder="Enter price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <label>Product Category:</label>
      <input
        type="text"
        placeholder="Enter category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <label>Product Image:</label>
      <input
        type="file"
        onChange={handleImageUpload}
      />
      <label>Vendor Name:</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        onChange={(e) => setVendorName(e.target.value)}
        value={vendorName}
      />
      <label>Vendor Email:</label>
      <input
        type="email"
        placeholder="Enter vendor email"
        onChange={(e) => setVendorEmail(e.target.value)}
        value={vendorEmail}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
