import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Product Inventory</h1>
        </Link>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
