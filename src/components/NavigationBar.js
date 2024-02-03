import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import './NavigationBar.css'

const NavigationBar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (user) {
     navigate('/create');
    } else {
      navigate('/sign-in');
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">Logo</Link>
      <Nav className="mr-auto">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
      </Nav>
      <Nav className="ml-auto"> {/* Use ml-auto here */}
        <Button variant="primary" className="mr-2" onClick={handleCreatePost}>
          Create Post
        </Button>
        {user ? (
          <>
          <span className="nav-link text-white">{user.name}</span>
          <Button className="nav-link btn btn-link text-white" onClick={signOut}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className={`nav-link ${location.pathname === '/sign-in' ? 'active' : ''}`}>Sign In</Link>
            <Link to="/sign-up" className={`nav-link ${location.pathname === '/sign-up' ? 'active' : ''}`}>Sign Up</Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
