import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vaccinations from './pages/Vaccinations';
import AddChild from './pages/AddChild';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';

// Component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.includes('-dashboard');

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <main className={`main-content ${hideNavbar ? 'no-navbar' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vaccinations" element={<Vaccinations />} />
          <Route path="/add-child" element={<AddChild />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          {/* Placeholder routes for sidebar menu items */}
          <Route path="/appointments" element={<UserDashboard />} />
          <Route path="/records" element={<UserDashboard />} />
          <Route path="/reminders" element={<UserDashboard />} />
          <Route path="/settings" element={<UserDashboard />} />
          <Route path="/patients" element={<DoctorDashboard />} />
          <Route path="/schedule" element={<DoctorDashboard />} />
          <Route path="/reports" element={<DoctorDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
