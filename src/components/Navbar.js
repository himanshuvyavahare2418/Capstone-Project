import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-wrapper">
            <span className="logo-icon">💉</span>
          </div>
          <span className="logo-text">
            BabyVax<span className="logo-accent">Monitor</span>
          </span>
        </Link>

        <div className="nav-center">
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vaccinations" className="nav-link" onClick={() => setIsOpen(false)}>
                <span className="nav-icon">💊</span>
                Vaccinations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
                <span className="nav-icon">ℹ️</span>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-child" className="nav-link btn-add" onClick={() => setIsOpen(false)}>
                <span className="nav-icon">👶</span>
                Add Child
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <div className="search-container" ref={searchRef}>
            <button 
              className={`action-btn search-btn ${isSearchOpen ? 'active' : ''}`}
              onClick={toggleSearch}
              aria-label="Search"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            
            <div className={`search-dropdown ${isSearchOpen ? 'open' : ''}`}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-submit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="auth-buttons">
            <Link to="/login" className="nav-login-btn">Sign In</Link>
            <Link to="/register" className="nav-register-btn">Register</Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
