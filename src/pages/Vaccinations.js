import React from 'react';
import './Vaccinations.css';

const Vaccinations = () => {
  // Sample vaccination data
  const vaccinations = [
    { id: 1, child: 'Emma Johnson', age: 'Birth', vaccine: 'Hepatitis B', dueDate: '2024-01-20', status: 'completed' },
    { id: 2, child: 'Emma Johnson', age: '2 Months', vaccine: 'DTaP, IPV, Hib, HepB', dueDate: '2024-02-20', status: 'upcoming' },
    { id: 3, child: 'Liam Smith', age: '4 Months', vaccine: 'DTaP, IPV, Hib', dueDate: '2024-02-15', status: 'upcoming' },
    { id: 4, child: 'Olivia Brown', age: '6 Months', vaccine: 'Influenza', dueDate: '2024-01-25', status: 'overdue' },
    { id: 5, child: 'Noah Davis', age: '12 Months', vaccine: 'MMR, Varicella', dueDate: '2024-02-01', status: 'upcoming' },
    { id: 6, child: 'Emma Johnson', age: '6 Months', vaccine: 'Rotavirus', dueDate: '2024-01-10', status: 'completed' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'upcoming': return 'status-upcoming';
      case 'overdue': return 'status-overdue';
      default: return '';
    }
  };

  return (
    <div className="vaccinations">
      <div className="vaccinations-header">
        <h1>Vaccination Schedule</h1>
        <p>Track and manage all vaccinations for your children</p>
      </div>

      <div className="vaccinations-filters">
        <div className="filter-group">
          <label>Filter by:</label>
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Child:</label>
          <select className="filter-select">
            <option value="all">All Children</option>
            <option value="emma">Emma Johnson</option>
            <option value="liam">Liam Smith</option>
            <option value="olivia">Olivia Brown</option>
            <option value="noah">Noah Davis</option>
          </select>
        </div>
      </div>

      <div className="vaccinations-table">
        <table>
          <thead>
            <tr>
              <th>Child Name</th>
              <th>Age Group</th>
              <th>Vaccine</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vaccinations.map((vax) => (
              <tr key={vax.id}>
                <td>{vax.child}</td>
                <td>{vax.age}</td>
                <td>{vax.vaccine}</td>
                <td>{vax.dueDate}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(vax.status)}`}>
                    {vax.status === 'completed' && '✓ '}
                    {vax.status === 'upcoming' && '⏰ '}
                    {vax.status === 'overdue' && '⚠️ '}
                    {vax.status.charAt(0).toUpperCase() + vax.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="btn-action">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vaccinations;
