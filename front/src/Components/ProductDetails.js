import React, { useState } from 'react';
import '../styles/ProductDetails.css';
import { useProductContext } from "../hooks/useProductContext";
import ProductUpdateForm from './ProductUpdateForm';
import { useAuthContext } from '../hooks/useAuthContext';
const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const {user} = useAuthContext()
  const handleDelete = async () => {
    if(!user)
    {
      return 
    }
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'DELETE',
        'Authorization': `Bearer ${user.token}`
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_PRODUCT', payload: json});
      }
    
  };

  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} className="product-image" alt={product.name} />
      )}
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setIsUpdating(true)}>Update</button>
      </div>
      {isUpdating && (
        <div className="update-form">
          <ProductUpdateForm product={product} onClose={() => setIsUpdating(false)} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
