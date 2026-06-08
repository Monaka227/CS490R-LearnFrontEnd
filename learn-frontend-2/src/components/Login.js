import React, { useState } from 'react';
import './ReviewCard.css';
import './Login.css'; 

export const Login = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false); // state to toggle between login and signup forms
    const [username, setUsername] = useState(''); // state for signup username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
          const signUpData = { username, email, password};
          fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUpData),
          })
            .then((res) => {
              return res.json().then((data) => {
                if (!res.ok) throw new Error(data.message || "Signup failed");
                return data;
              });
            })
            .then(() => {
              alert("Signup successful! Please log in.");
              setIsSignUp(false); // switch to login form after successful signup
              setUsername('');
            })
            .catch((err) => {
              console.error('Error during signup:', err);
              setError(err.message || 'Signup failed. Please try again.');
            });

          } else {
            const loginData = { email, password };
              fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              })
              .then((res) => {
                return res.json().then((data) => {
                  if (!res.ok) throw new Error(data.message || "Login failed");
                  return data;
                });
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
        }
    };

    return (
      <div className="auth-container">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="auth-input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          )}

          <div className="auth-input-group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="auth-input"
            />
          </div>

        <button type="submit" className={`auth-submit-btn ${isSignUp ? 'btn-signup' : 'btn-login'}`}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <p className="auth-switch-text">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span
          onClick={() => {
            setIsSignUp(!isSignUp);
            setEmail('');
            setPassword('');
          }}
          className="auth-switch-link"
        >
          {isSignUp ? "Login here" : "Sign up here"}
        </span>
      </p>
    </div>
  );
};