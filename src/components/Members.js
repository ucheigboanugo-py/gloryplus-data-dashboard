// src/components/Members.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '' }); // Form state

  // Fetch members from backend
  useEffect(() => {
    axios.get('/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Add a new member
  const addMember = () => {
    axios.post('/members', newMember)
      .then(response => setMembers([...members, response.data]))
      .catch(error => console.error('Error adding member:', error));
  };

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name} - {member.email}</li>
        ))}
      </ul>
      <h3>Add New Member</h3>
      <input name="name" placeholder="Name" onChange={handleInputChange} />
      <input name="email" placeholder="Email" onChange={handleInputChange} />
      <button onClick={addMember}>Add Member</button>
    </div>
  );
};

export default Members;
