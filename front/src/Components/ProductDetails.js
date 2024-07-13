
import React from 'react';
import '../styles/ProductDetails.css';

const ProductDetails =({product})=>
{
    return (
        <div className="product-details">
            <h4> {product.name} </h4>
            <p><strong>Qunatity : </strong>{product.quantity} </p>
            <p> <strong>Price :</strong>{product.price} </p>
            <p><strong>Category : </strong>{product.category} </p >

            </div>
        
    )
}
export default ProductDetails