import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const userMenuItems = [
    { path: '/user-dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/vaccinations', icon: '💉', label: 'Vaccinations' },
    { path: '/add-child', icon: '👶', label: 'Add Child' },
    { path: '/appointments', icon: '📅', label: 'Appointments' },
    { path: '/records', icon: '📋', label: 'Records' },
    { path: '/reminders', icon: '🔔', label: 'Reminders' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const doctorMenuItems = [
    { path: '/doctor-dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/vaccinations', icon: '💉', label: 'Vaccinations' },
    { path: '/patients', icon: '👥', label: 'Patients' },
    { path: '/schedule', icon: '📅', label: 'Schedule' },
    { path: '/records', icon: '📋', label: 'Records' },
    { path: '/reports', icon: '📊', label: 'Reports' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const menuItems = userType === 'doctor' ? doctorMenuItems : userMenuItems;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">💉</span>
          <span className="logo-text">BabyVax</span>
        </div>
        <div className="user-badge">
          {userType === 'doctor' ? (
            <>
              <span>👨‍⚕️</span> Doctor
            </>
          ) : (
            <>
              <span>👤</span> Parent
            </>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
