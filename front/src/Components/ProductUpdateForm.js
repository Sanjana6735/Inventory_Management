import React, { useState} from 'react';
import '../styles/ProductForm.css';
import { useProductContext } from "../hooks/useProductContext";
import axios from 'axios';

const ProductUpdateForm = ({ product, onClose }) => {
  const { dispatch } = useProductContext();

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [error, setError] = useState(null);
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";

  const handleImageUpload = async (e) => {
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
    const updatedProduct = { name, quantity, price, category, image };
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
        headers: { 'Content-Type': 'application/json' },
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
      setError(err.message);
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
        onChange={handleImageUpload}
      />
      <button type="submit">Update Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductUpdateForm;
