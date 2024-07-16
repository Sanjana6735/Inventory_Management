import React, { useState } from 'react';
import '../styles/ProductForm.css';
import { Cloudinary } from 'cloudinary-core';
import axios from 'axios';
// const cloudinary = new Cloudinary({ cloud_name: 'da4udw5q2', secure: true });

const ProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('hey error');
  const [error, setError] = useState(null);
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";

  const handleImageUpload2 = async (e) =>
  {
    const file = e.target.files[0];
    // setName(e.target.files[0].name)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      .then((res)=>console.log(res))
      
      .catch((err) => {
        console.log(err);
});
};
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, quantity, price, category, image};
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
      setQuantity('');
      setPrice('');
      setCategory('');
      setImage('');
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
