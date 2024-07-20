import React, { useEffect } from 'react';
import ProductDetails from '../Components/ProductDetails';
import ProductForm from '../Components/productform';
import { useProductContext } from '../hooks/useProductContext';

const Home = () => {
  const { products, dispatch } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_PRODUCT', payload: json });
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="products">
        {products && products.map(product => (
          <ProductDetails key={product._id} product={product} />
        ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
