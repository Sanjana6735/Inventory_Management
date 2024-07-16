import React from 'react';
import '../styles/ProductDetails.css';

const ProductDetails = ({ product }) => {
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
      </div>
    </div>
  );
};

export default ProductDetails;
