import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginAuthentication = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('exp', data.exp);
        localStorage.setItem('level', 0); //fix later
        navigate("/home");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="right-side-bar">
        <h2>Crystal Chrono</h2>
        <div className="small-line-white"/>
        <p>Don't have an account? Sign up today!</p>
        <button onClick={() => navigate("/signup")}> Sign Up</button>
      </div>

      <div className="left-side-bar">
        <h2>Welcome Back!</h2>
        <div className="small-line-purple"/>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button onClick={loginAuthentication} type="button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
