import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [patients, setPatients] = useState([
    { id: 1, name: 'Emma Johnson', age: '2 years', parent: 'Sarah Johnson', lastVisit: '2024-01-15', status: 'completed' },
    { id: 2, name: 'Oliver Smith', age: '6 months', parent: 'Mike Smith', lastVisit: '2024-01-20', status: 'pending' },
    { id: 3, name: 'Sophia Davis', age: '1 year', parent: 'John Davis', lastVisit: '2024-01-10', status: 'completed' },
    { id: 4, name: 'Liam Wilson', age: '3 years', parent: 'Emma Wilson', lastVisit: '2024-01-25', status: 'pending' }
  ]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    if (role !== 'doctor') {
      navigate('/login');
      return;
    }
    
    if (name) {
      setUserName(name);
    }
  }, [navigate]);

  const pendingCount = patients.filter(p => p.status === 'pending').length;

  return (
    <div className="dashboard-layout">
      <Sidebar userType="doctor" />
      
      <div className="dashboard-main">
        <div className="doctor-header">
          <div className="header-content">
            <div className="doctor-badge">
              <span>👨‍⚕️</span> Doctor
            </div>
            <h1>Dr. {userName}</h1>
            <p>Pediatric Vaccination Dashboard</p>
          </div>
        </div>

        <div className="doctor-content">
          {/* Quick Stats */}
          <div className="doctor-stats">
            <div className="stat-card blue">
              <div className="stat-icon">📋</div>
              <div className="stat-info">
                <h3>{patients.length}</h3>
                <p>Total Patients</p>
              </div>
            </div>
            <div className="stat-card orange">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>{pendingCount}</h3>
                <p>Pending Vaccines</p>
              </div>
            </div>
            <div className="stat-card green">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{patients.length - pendingCount}</h3>
                <p>Completed Today</p>
              </div>
            </div>
            <div className="stat-card purple">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>8</h3>
                <p>Appointments</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="section">
            <div className="section-header">
              <h2>Today's Schedule</h2>
              <button className="add-btn">+ New Patient</button>
            </div>
            
            <div className="schedule-timeline">
              <div className="timeline-item">
                <div className="time">09:00 AM</div>
                <div className="timeline-content">
                  <div className="patient-info">
                    <h4>Emma Johnson</h4>
                    <p>2 years • Sarah Johnson (Parent)</p>
                  </div>
                  <span className="status-badge completed">Completed</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="time">10:00 AM</div>
                <div className="timeline-content">
                  <div className="patient-info">
                    <h4>Oliver Smith</h4>
                    <p>6 months • Mike Smith (Parent)</p>
                  </div>
                  <span className="status-badge pending">Pending</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="time">11:00 AM</div>
                <div className="timeline-content">
                  <div className="patient-info">
                    <h4>Liam Wilson</h4>
                    <p>3 years • Emma Wilson (Parent)</p>
                  </div>
                  <span className="status-badge pending">Pending</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="time">02:00 PM</div>
                <div className="timeline-content">
                  <div className="patient-info">
                    <h4>Sophia Davis</h4>
                    <p>1 year • John Davis (Parent)</p>
                  </div>
                  <span className="status-badge completed">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div className="section">
            <h2>All Patients</h2>
            <div className="patients-table">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Parent</th>
                    <th>Last Visit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id}>
                      <td>
                        <div className="patient-name">
                          <span className="avatar">{patient.name.charAt(0)}</span>
                          {patient.name}
                        </div>
                      </td>
                      <td>{patient.age}</td>
                      <td>{patient.parent}</td>
                      <td>{patient.lastVisit}</td>
                      <td>
                        <span className={`status-badge ${patient.status}`}>
                          {patient.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn">View</button>
                          <button className="edit-btn">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/add-child" className="action-card">
                <span className="action-icon">➕</span>
                <h4>Add Patient</h4>
                <p>Register new child</p>
              </Link>
              <Link to="/vaccinations" className="action-card">
                <span className="action-icon">💉</span>
                <h4>Vaccine Records</h4>
                <p>View all records</p>
              </Link>
              <div className="action-card">
                <span className="action-icon">📊</span>
                <h4>Reports</h4>
                <p>Generate reports</p>
              </div>
              <div className="action-card">
                <span className="action-icon">📧</span>
                <h4>Send Reminders</h4>
                <p>Notify parents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
