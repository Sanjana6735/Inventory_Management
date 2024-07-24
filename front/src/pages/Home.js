import React, { useEffect } from 'react';
import ProductDetails from '../Components/ProductDetails';
import ProductForm from '../Components/productform';
import { useProductContext } from '../hooks/useProductContext';
import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {
  const { products, dispatch } = useProductContext();
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products',
          {
            headers:{
              'Authorization': `Bearer ${user.token}`
            }
          }
        );
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
    if(user)
    {
      fetchProducts();
    }
    
  }, [dispatch,user]);

  return (
    <div className="home">
      
      <div className="products">
        {products && products.map(product => (
          <ProductDetails key={product._id} product={product} />
        ))}
      </div>
      <ProductForm/>
    </div>
  );
};

export default Home;
