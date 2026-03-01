import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      // Check for doctor credentials
      if (username === 'Mr.doctor' && password === 'doctor123') {
        // Doctor login - store role in localStorage
        localStorage.setItem('userRole', 'doctor');
        localStorage.setItem('userName', username);
        navigate('/doctor-dashboard');
      } 
      // Check for any other valid login (for demo purposes)
      else if (username && password) {
        // Regular user login
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userName', username);
        navigate('/user-dashboard');
      } 
      else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">💉</div>
          <h1>Welcome Back</h1>
          <p>Sign in to BabyVax Monitor</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Doctor:</strong> Mr.doctor / doctor123</p>
          <p><strong>User:</strong> Any username / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
