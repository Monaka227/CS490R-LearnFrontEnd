import React, { useState } from 'react';
import './ReviewCard.css';

export const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // send login request to backend
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Login failed");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Login successful:", data.token);

                // Store token in localStorage for future authenticated requests
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Store user data as well

                onLoginSuccess(data.token, data.user); // pass user data to parent component
            })
            .catch((err) => {
                console.error('Error during login:', err);
                setError('Invalid email or password');
            });
    };

    return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Login to Tabletop Treasures</h3>
        
        {error && <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="submit-button" style={{ backgroundColor: '#3498db' }}>
          Login
        </button>
      </form>
    </div>
  );
};