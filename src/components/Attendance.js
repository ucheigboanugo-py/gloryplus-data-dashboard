// src/components/Attendance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

// Usage in your component
const MyComponent = () => (
    <Container>
        <h1>Welcome!</h1>
    </Container>
);


const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch attendance records
  useEffect(() => {
    axios.get('/attendance')
      .then(response => setAttendanceRecords(response.data))
      .catch(error => console.error('Error fetching attendance:', error));
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record.id}>{record.date} - {record.memberName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
