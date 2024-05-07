
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './Navbar.css'
import Login from './Login';
import Register from './Register';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

    const handleSignInClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleRegisterClick = () => {
      setShowRegister(true); 
    };

    const handleCloseRegister = () => {
      setShowRegister(false); 
    };

    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand" href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: 'white' }}>AppointMed</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link " aria-current="page" href="/aboutUs">About us</a>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
      <li class="nav-item">
      <button className="nav-link btn btn-link" onClick={handleRegisterClick}>Register</button>
        </li>
        <li className="nav-item">
        <button className="nav-link btn btn-link" onClick={handleSignInClick}>Sign In</button>

        </li>
      </ul>
      
    </div>
  </div>
</nav>
      <Login show={showLogin} handleCloseLogin={handleCloseLogin} />
      <Register show={showRegister} handleCloseRegister={handleCloseRegister} />
        </>
    );
}

