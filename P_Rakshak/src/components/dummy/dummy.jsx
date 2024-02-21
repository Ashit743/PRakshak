import React, { useState, useEffect } from 'react';

function AppointmentList({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/patient/${patientId}/appointments`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Appointments for Patient {patientId}</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.title} - {appointment.start} to {appointment.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
