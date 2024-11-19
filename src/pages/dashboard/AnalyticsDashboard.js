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
        setAttendanceData([{ date: '2024-10-10', count: 50 }]);
    };

    const fetchVisitorData = async () => {
        setVisitorData([{ name: 'John Doe', visitDate: '2024-10-11' }]);
    };

    const fetchFollowUpData = async () => {
        setFollowUpData([{ followUpDate: '2024-10-12', notes: 'Called for follow-up' }]);
    };

    const fetchEventData = async () => {
        setEventData([{ eventName: 'Community Meetup', date: '2024-10-15' }]);
    };

    return (
        <Container>
            <Section>
                <h2>Attendance</h2>
                {attendanceData.length > 0 ? (
                    attendanceData.map((item, index) => (
                        <p key={index}>Date: {item.date}, Count: {item.count}</p>
                    ))
                ) : (
                    <p>No attendance data available</p>
                )}
            </Section>

            <Section>
                <h2>New Visitors</h2>
                {visitorData.length > 0 ? (
                    visitorData.map((visitor, index) => (
                        <p key={index}>Name: {visitor.name}, Visit Date: {visitor.visitDate}</p>
                    ))
                ) : (
                    <p>No visitor data available</p>
                )}
            </Section>

            <Section>
                <h2>Follow-Ups</h2>
                {followUpData.length > 0 ? (
                    followUpData.map((followUp, index) => (
                        <p key={index}>Date: {followUp.followUpDate}, Notes: {followUp.notes}</p>
                    ))
                ) : (
                    <p>No follow-up data available</p>
                )}
            </Section>

            <Section>
                <h2>Upcoming Events</h2>
                {eventData.length > 0 ? (
                    eventData.map((event, index) => (
                        <p key={index}>Event: {event.eventName}, Date: {event.date}</p>
                    ))
                ) : (
                    <p>No event data available</p>
                )}
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
    
    p {
        margin: 5px 0;
        color: #666;
    }
`;
