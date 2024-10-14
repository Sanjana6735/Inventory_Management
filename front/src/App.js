import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Home2 from './pages/Home';
import AddProduct from './pages/AddProduct'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import SalesPage from './pages/SalesPage';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={  <Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to ="/"/>} />
            <Route path="/signup" element={!user ? <Signup />: <Navigate to="/"/>} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to ="/login"/>} />
            <Route path="/SalesPage" element={user ? <SalesPage /> : <Navigate to ="/login"/>} />
            <Route path="/Home2" element={user ? <Home2 /> : <Navigate to ="/login"/>} />
            <Route path="/AddProduct" element={user ? <AddProduct /> : <Navigate to ="/login"/>} />
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
