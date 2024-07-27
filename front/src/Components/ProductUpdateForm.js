import React, { useState } from 'react';
import '../styles/ProductForm.css';
import { useProductContext } from "../hooks/useProductContext";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const ProductUpdateForm = ({ product, onClose }) => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  const [name, setName] = useState(product.name || '');
  const [quantity, setQuantity] = useState(product.quantity || '');
  const [price, setPrice] = useState(product.price || '');
  const [category, setCategory] = useState(product.category || '');
  const [image, setImage] = useState(product.image || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
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

    // Basic validation
    if (!name || !quantity || !price || !category) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (isNaN(quantity) || isNaN(price)) {
      setError("Quantity and price must be numbers.");
      setLoading(false);
      return;
    }

    const updatedProduct = { name, quantity, price, category, image: image || product.image };

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        dispatch({ type: 'UPDATE_PRODUCT', payload: json });
        onClose();
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update Product</h3>
      <label>Product Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Product Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
      <label>Product Price:</label>
      <input
        type="number"
        step="0.01"
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
        onChange={handleImageUpload}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Updating Product...' : 'Update Product'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductUpdateForm;
