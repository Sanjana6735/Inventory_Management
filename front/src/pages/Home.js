import { useEffect, useState } from "react";
import ProductDetails from "../Components/ProductDetails"
import '../styles/Home.css';
import ProductForm from "../Components/productform";
const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('/api/products');
      const json = await response.json();
      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="Home">
      <div className="products">
        {products && products.map((product) => (
          //<p key={product._id}>{product.name}</p>
          <ProductDetails key={product._id} product={product} />    
        ))}
      </div>
      <ProductForm/>
    </div>
  );
};

export default Home;
