import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <h1>Product Inventory</h1>
        </Link>
        <nav className="navbar-links">
          {user ? (
            <div className="navbar-user">
              <span>Welcome {user.name}</span>
              <button onClick={handleClick} className="navbar-button">Logout</button>
              <Link to="/dashboard" className="navbar-button">Dashboard</Link>
              <Link to="/Salespage" className="navbar-button">Sales</Link>
              <Link to="/Home2" className ="navbar-button">Data</Link>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
        
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
