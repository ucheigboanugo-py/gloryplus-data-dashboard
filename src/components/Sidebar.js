import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <h2>Menu</h2>
            <Link to="/">Dashboard</Link>
            <Link to="/members">Members</Link>
            <Link to="/attendance">Attendance</Link>
            
            <h3>Branches</h3>
            <Link to="/branch/mainland-hq">Mainland HQ</Link>
            <Link to="/branch/island-hq">Island HQ</Link>
            <Link to="/branch/majek">Majek</Link>
            <Link to="/branch/ketu">Ketu</Link>
            <Link to="/branch/portharcourt">Port Harcourt</Link>
            <Link to="/branch/umuahia">Umuahia</Link>
            <Link to="/branch/aba">Aba</Link>
            
            <ul>
                <li>Dashboard</li>
                <li>Reports</li>
                <li>Settings</li>
            </ul>
        </div>
    );
};

export default Sidebar;
