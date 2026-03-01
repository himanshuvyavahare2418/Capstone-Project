import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [children, setChildren] = useState([
    { id: 1, name: 'Emma', age: '2 years', vaccinesDue: 2, nextAppointment: '2024-02-15' },
    { id: 2, name: 'Oliver', age: '6 months', vaccinesDue: 3, nextAppointment: '2024-02-20' }
  ]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (role !== 'user') {
      navigate('/login');
      return;
    }
    
    if (name) {
      setUserName(name);
    }
  }, [navigate]);

  return (
    <div className="dashboard-layout">
      <Sidebar userType="user" />
      
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {userName}!</h1>
            <p>Manage your children's vaccinations</p>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Quick Stats */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">👶</div>
              <div className="stat-info">
                <h3>{children.length}</h3>
                <p>Children</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💉</div>
              <div className="stat-info">
                <h3>{children.reduce((acc, c) => acc + c.vaccinesDue, 0)}</h3>
                <p>Vaccines Due</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>2</h3>
                <p>Appointments</p>
              </div>
            </div>
          </div>

          {/* Children Section */}
          <div className="section">
            <div className="section-header">
              <h2>My Children</h2>
              <Link to="/add-child" className="add-btn">
                + Add Child
              </Link>
            </div>
            
            <div className="children-grid">
              {children.map(child => (
                <div key={child.id} className="child-card">
                  <div className="child-avatar">
                    {child.name.charAt(0)}
                  </div>
                  <div className="child-info">
                    <h3>{child.name}</h3>
                    <p className="child-age">{child.age}</p>
                    <div className="vaccine-status">
                      <span className="due-badge">{child.vaccinesDue} vaccines due</span>
                    </div>
                  </div>
                  <div className="child-actions">
                    <Link to="/vaccinations" className="view-btn">View Vaccines</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="section">
            <h2>Upcoming Appointments</h2>
            <div className="appointments-list">
              {children.map(child => (
                <div key={child.id} className="appointment-card">
                  <div className="appointment-date">
                    <span className="date">{new Date(child.nextAppointment).getDate()}</span>
                    <span className="month">{new Date(child.nextAppointment).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="appointment-info">
                    <h4>Vaccination Appointment</h4>
                    <p>{child.name} - {child.vaccinesDue} vaccines scheduled</p>
                  </div>
                  <button className="reschedule-btn">Reschedule</button>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div className="section">
            <h2>Reminders</h2>
            <div className="reminders-list">
              <div className="reminder-card warning">
                <span className="reminder-icon">⏰</span>
                <div className="reminder-info">
                  <h4>Polio Vaccine Due</h4>
                  <p>Due in 3 days for Oliver</p>
                </div>
              </div>
              <div className="reminder-card info">
                <span className="reminder-icon">💊</span>
                <div className="reminder-info">
                  <h4>MMR Vaccine Due</h4>
                  <p>Due in 1 week for Emma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
