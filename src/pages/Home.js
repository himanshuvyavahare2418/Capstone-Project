import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import images properly
import s1 from '../images/s1.png';
import s2 from '../images/s2.jpeg';
import s3 from '../images/s3.jpeg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data with imported images
  const slides = [
    {
      id: 1,
      image: s1,
      title: 'Keep Your Baby Protected',
      subtitle: 'Track vaccinations and never miss an important appointment',
      cta: 'Add Your Child',
      link: '/add-child'
    },
    {
      id: 2,
      image: s2,
      title: 'Vaccination Schedule',
      subtitle: 'Stay on track with personalized immunization schedules',
      cta: 'View Schedule',
      link: '/vaccinations'
    },
    {
      id: 3,
      image: s3,
      title: 'Healthy Future Starts Here',
      subtitle: 'Complete vaccinations for a healthy, happy child',
      cta: 'Learn More',
      link: '/vaccinations'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Vaccination Information Cards
  const vaccinationCards = [
    {
      id: 1,
      title: 'Why Vaccinations Matter',
      description: 'Vaccinations protect your baby from serious diseases like measles, polio, and hepatitis. They help build immunity and keep your child healthy.',
      icon: '🛡️',
      color: '#89CFF0',
      features: [
        'Protection against 14 diseases',
        'Safe and effective',
        'Builds immune system',
        'Community immunity'
      ]
    },
    {
      id: 2,
      title: 'Vaccination Schedule',
      description: 'Follow the recommended vaccination schedule to ensure your baby gets the right vaccines at the right time for maximum protection.',
      icon: '📅',
      color: '#FFB6C1',
      features: [
        'Birth to 6 years',
        'Regular checkups',
        'Free vaccinations',
        'Reminder alerts'
      ]
    }
  ];

  return (
    <div className="home">
      {/* Hero Banner Slider */}
      <div className="hero-banner">
        <div className="banner-container">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="banner-image-wrapper">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="banner-image"
                />
              </div>
              <div className="banner-content">
                <div className="banner-text">
                  <h1 className="banner-title">{slide.title}</h1>
                  <p className="banner-subtitle">{slide.subtitle}</p>
                  <Link to={slide.link} className="banner-cta">
                    {slide.cta} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Controls */}
          <button className="banner-nav prev" onClick={prevSlide}>
            <span>❮</span>
          </button>
          <button className="banner-nav next" onClick={nextSlide}>
            <span>❯</span>
          </button>
          
          {/* Banner Indicators */}
          <div className="banner-indicators">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="home-content">
        {/* Vaccination Info Cards */}
        <div className="vaccination-cards">
          {vaccinationCards.map((card) => (
            <div 
              key={card.id} 
              className="vaccination-card"
              style={{ borderTopColor: card.color }}
            >
              <div className="card-header">
                <span className="card-icon">{card.icon}</span>
                <h2 className="card-title">{card.title}</h2>
              </div>
              <p className="card-description">{card.description}</p>
              <ul className="card-features">
                {card.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/vaccinations" className="card-btn" style={{ background: card.color }}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Login/Signup CTA Section */}
      <div className="auth-cta-section">
        <div className="auth-cta-content">
          <div className="auth-cta-card login-card">
            <div className="auth-cta-icon">🔐</div>
            <h3>Already Have an Account?</h3>
            <p>Sign in to manage your child's vaccination records</p>
            <Link to="/login" className="auth-cta-btn login-btn">Sign In</Link>
          </div>
          <div className="auth-cta-card register-card">
            <div className="auth-cta-icon">👶</div>
            <h3>New Here?</h3>
            <p>Create an account to start tracking vaccinations</p>
            <Link to="/register" className="auth-cta-btn register-btn">Register Now</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">💉</span>
              <span className="footer-logo-text">BabyVax Monitor</span>
            </div>
            <p className="footer-description">
              Helping parents keep their children healthy through organized vaccination tracking.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📸</a>
              <a href="#" className="social-link">🐦</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vaccinations">Vaccinations</Link></li>
              <li><Link to="/add-child">Add Child</Link></li>
              <li><Link to="/vaccinations">Schedule</Link></li>
              <li><Link to="/login" className="login-link">Login</Link></li>
              <li><Link to="/register" className="register-link">Register</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>📍 123 Health Street</li>
              <li>📧 support@babyvax.com</li>
              <li>📞 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 BabyVax Monitor. All rights reserved. Made with 💜 for healthy babies.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
