// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import branchLocations from '../src/branches.js'; // Adjust path as needed

// Existing Dashboard component code here...


const Dashboard = () => {
    // State for storing data fetched from backend
    const [predictedAttendance, setPredictedAttendance] = useState([]);
    const [sentimentData, setSentimentData] = useState([]);
    const [engagementData, setEngagementData] = useState([]);
    const [branchGrowthData, setBranchGrowthData] = useState([]);
    
    // Fetch data from backend for predictive and sentiment analysis
    useEffect(() => {
        const fetchPredictedAttendance = async () => {
            const response = await fetch('/api/predict-attendance'); // API endpoint from backend
            const data = await response.json();
            setPredictedAttendance(data);
        };
        
        const fetchSentimentData = async () => {
            const response = await fetch('/api/sentiment-analysis'); // API endpoint from backend
            const data = await response.json();
            setSentimentData(data);
        };
        
        const fetchEngagementData = async () => {
            const response = await fetch('/api/engagement-data'); // API endpoint from backend
            const data = await response.json();
            setEngagementData(data);
        };

        fetchPredictedAttendance();
        fetchSentimentData();
        fetchEngagementData();
    }, []);
    
    // Sample engagement conversion funnel data
    const engagementFunnelData = {
        labels: ['First Timers', 'Attended Membership Class', 'Joined Department', 'Joined Cell'],
        datasets: [
            {
                label: 'Engagement Funnel',
                data: engagementData, // from backend
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    // Predicted vs. historical attendance line chart data
    const attendanceLineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Historical Attendance',
                data: [100, 200, 300, 250, 400, 600, 800], // Sample historical data
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Predicted Attendance',
                data: predictedAttendance, // Fetched predicted data
                borderColor: 'rgba(255,99,132,1)',
                borderDash: [5, 5],
                fill: false,
            },
        ],
    };

    // Sentiment analysis line chart data
    const sentimentLineData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Sentiment Trend',
                data: sentimentData,
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>GloryPlus International Dashboard</h2>

            {/* Top widgets */}
            <div className="widgets">
                <div className="widget">Total Branches: 7</div>
                <div className="widget">First Timers: 50</div>
                <div className="widget">Second Timers: 30</div>
                <div className="widget">Total Cells: 10</div>
                <div className="widget">Total Members: 1000</div>
                <div className="widget">Total Attendance: 800</div>
            </div>

            {/* Map for branch locations */}
            <div className="map-container">
                <h3>Branch Locations</h3>
                <MapContainer center={[6.5244, 3.3792]} zoom={7} style={{ height: '300px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {branchLocations.map((branch, index) => (
                        <Marker key={index} position={branch.position}>
                            <Popup>{branch.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Attendance trends (Historical vs Predicted) */}
            <div className="chart">
                <h3>Attendance Trends</h3>
                <Line data={attendanceLineData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* Sentiment analysis chart */}
            <div className="chart">
                <h3>Sentiment Analysis Over Time</h3>
                <Line data={sentimentLineData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* Engagement conversion funnel */}
            <div className="chart">
                <h3>Engagement Conversion Funnel</h3>
                <Pie data={engagementFunnelData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* Branch attendance per branch (Growth) */}
            <div className="chart">
                <h3>Branch Growth and Attendance</h3>
                <Bar data={branchGrowthData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default Dashboard;


