import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Dashboard = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [visitorData, setVisitorData] = useState([]);
    const [followUpData, setFollowUpData] = useState([]);
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend (placeholders for now)
        fetchAttendanceData();
        fetchVisitorData();
        fetchFollowUpData();
        fetchEventData();
    }, []);

    const fetchAttendanceData = async () => {
        // Placeholder - replace with actual API call
        setAttendanceData([/* sample data */]);
    };

    const fetchVisitorData = async () => {
        setVisitorData([/* sample data */]);
    };

    const fetchFollowUpData = async () => {
        setFollowUpData([/* sample data */]);
    };

    const fetchEventData = async () => {
        setEventData([/* sample data */]);
    };

    return (
        <Container>
            <Section>
                <h2>Attendance</h2>
                {/* Map over attendanceData to display */}
            </Section>
            <Section>
                <h2>New Visitors</h2>
                {/* Map over visitorData to display */}
            </Section>
            <Section>
                <h2>Follow-Ups</h2>
                {/* Map over followUpData to display */}
            </Section>
            <Section>
                <h2>Upcoming Events</h2>
                {/* Map over eventData to display */}
            </Section>
        </Container>
    );
};

export default Dashboard;

// Styled components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
`;

const Section = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    h2 {
        font-size: 1.2em;
        color: #333;
    }
`;
