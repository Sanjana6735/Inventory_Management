import React, { useEffect, useState } from 'react';
import ProductDetails from '../Components/ProductDetails';
import ProductForm from '../Components/productform';
import { useProductContext } from '../hooks/useProductContext';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/data.css'
const Home = () => {
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_PRODUCT', payload: json });
        } else {
          console.error('Failed to fetch products:', json);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

 
  const filteredProducts = products?.filter((product) =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
     
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
