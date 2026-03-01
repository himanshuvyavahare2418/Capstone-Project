import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    userType: 'parent'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { fullName, email, username, password, confirmPassword, userType } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store user info
      localStorage.setItem('userRole', userType === 'doctor' ? 'doctor' : 'user');
      localStorage.setItem('userName', username);
      
      // Redirect based on user type
      if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="register-icon">💉</div>
          <h1>Create Account</h1>
          <p>Join BabyVax Monitor today</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="user-type-selector">
            <label>I am a:</label>
            <div className="user-type-options">
              <label className={`type-option ${userType === 'parent' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="parent"
                  checked={userType === 'parent'}
                  onChange={handleChange}
                />
                <span className="type-icon">👨‍👩‍👧</span>
                <span className="type-label">Parent</span>
              </label>
              <label className={`type-option ${userType === 'doctor' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  checked={userType === 'doctor'}
                  onChange={handleChange}
                />
                <span className="type-icon">👨‍⚕️</span>
                <span className="type-label">Doctor</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Choose a username"
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
