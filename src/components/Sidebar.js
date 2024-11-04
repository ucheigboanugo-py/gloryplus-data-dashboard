import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <nav className="sidebar">
        <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/new-visitors">New Visitors</Link></li>
            <li><Link to="/second-timers">Second Timers</Link></li>
            <li><Link to="/follow-up">Follow-Up</Link></li>
            <li><Link to="/events">Events</Link></li>
        </ul>
    </nav>
);

export default Sidebar;

