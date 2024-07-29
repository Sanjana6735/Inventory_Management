import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import '../styles/Login.css'; // Make sure to create this CSS file
import logo from '../logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="login-logo" /> {/* Update the path to your logo */}
        <h3>Log In</h3>
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          required
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          required
        />
        <button disabled={isLoading} className="login-button">Login</button>
        {error && <div className="error">{error}</div>}
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
