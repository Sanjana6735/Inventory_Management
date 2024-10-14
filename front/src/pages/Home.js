import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Home.css';

const carouselImages = [
  './image1.jpeg'
];

const Home = () => {
  const { user } = useAuthContext();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const response = await fetch('/api/products', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const json = await response.json();
          if (response.ok) {
          } else {
            console.error('Failed to fetch products:', json);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our Inventory Management System</h1>
        <p>Efficient, Real-time Inventory Tracking for Your Business</p>
        <a href="#features" className="cta-button">Learn More</a>
      </section>

      <div className="carousel">
        <img src={carouselImages[currentImage]} alt="Inventory" />
      </div>

      <section id="about" className="about">
        <h2>About Our System</h2>
        <p>Our Inventory Management System simplifies product tracking, ensuring you never run out of stock. Automate your inventory processes and get real-time insights into your product levels with our user-friendly platform.</p>
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Real-time Inventory Tracking</h3>
            <p>Monitor product levels and updates in real time.</p>
          </div>
          <div className="feature-item">
            <h3>Automated Reports</h3>
            <p>Generate detailed reports to keep track of your stock and sales.</p>
          </div>
          <div className="feature-item">
            <h3>Low Stock Alerts</h3>
            <p>Get notified when your inventory is running low.</p>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Save time and reduce manual effort</li>
          <li>Increase efficiency with automated stock updates</li>
          <li>Improve decision-making with data-driven insights</li>
        </ul>
      </section>

      <section className="cta">
        <h2>Ready to streamline your inventory management?</h2>
        <a href="/signup" className="cta-button">Get Started Today</a>
      </section>
    </div>
  );
};

export default Home;
