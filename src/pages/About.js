import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About BabyVax Monitor</h1>
          <p className="about-hero-subtitle">
            Helping parents keep their children healthy through organized vaccination tracking
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-section">
          <div className="about-card">
            <div className="about-card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              BabyVax Monitor is dedicated to ensuring every child receives their vaccinations on time. 
              We believe that no child should suffer from preventable diseases, and our platform helps 
              parents stay organized and informed about their child's vaccination schedule.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Smart Scheduling</h3>
              <p>
                Get personalized vaccination schedules based on your child's age and health profile. 
                Never miss an important appointment again.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Reminder Alerts</h3>
              <p>
                Receive timely notifications before each vaccination appointment so you can plan ahead 
                and ensure your child is ready.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>
                Track your child's vaccination history and see their progress through the 
                recommended immunization schedule.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Healthcare Connect</h3>
              <p>
                Connect with healthcare providers and access vaccination records easily 
                whenever needed.
              </p>
            </div>
          </div>
        </section>

        {/* Importance of Vaccination */}
        <section className="about-section importance-section">
          <h2 className="section-title">Why Vaccination Matters</h2>
          <div className="importance-grid">
            <div className="importance-card">
              <div className="importance-number">01</div>
              <h3>Disease Prevention</h3>
              <p>
                Vaccines protect against 14 serious diseases including measles, polio, hepatitis, 
                and whooping cough. Immunization is one of the most effective ways to keep 
                children healthy.
              </p>
            </div>
            <div className="importance-card">
              <div className="importance-number">02</div>
              <h3>Community Immunity</h3>
              <p>
                When more people are vaccinated, it protects those who cannot be vaccinated 
                due to medical reasons. This concept, called herd immunity, helps keep 
                entire communities safe.
              </p>
            </div>
            <div className="importance-card">
              <div className="importance-number">03</div>
              <h3>Safe & Effective</h3>
              <p>
                Vaccines are thoroughly tested for safety and effectiveness before being 
                approved. The benefits of vaccination far outweigh the minimal risks of 
                side effects.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="about-section stats-section">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Children Tracked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Vaccinations Recorded</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">On-Time Vaccinations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Healthcare Partners</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-section cta-section">
          <div className="cta-card">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of parents who trust BabyVax Monitor to keep their children healthy 
              and protected.
            </p>
            <div className="cta-buttons">
              <Link to="/add-child" className="cta-btn primary">
                Add Your Child
              </Link>
              <Link to="/vaccinations" className="cta-btn secondary">
                View Schedule
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
