import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Dashboard.css';
import branchLocations from '../branches.js';
import { fetchData, formatBranchGrowthData } from '../api/dataService';
import '../components/FileUpload/FileUpload.css';

const locations = branchLocations || [];

const Dashboard = () => {
    const [predictedAttendance, setPredictedAttendance] = useState([]);
    const [sentimentData, setSentimentData] = useState([]);
    const [engagementData, setEngagementData] = useState([]);
    const [branchGrowthData, setBranchGrowthData] = useState([]);

    useEffect(() => {
        const fetchDataFromBackend = async () => {
            try {
                const attendanceData = await fetchData('/api/predict-attendance');
                setPredictedAttendance(Array.isArray(attendanceData) ? attendanceData : []);

                const sentimentDataResponse = await fetchData('/api/sentiment-analysis');
                setSentimentData(Array.isArray(sentimentDataResponse) ? sentimentDataResponse : []);

                const engagementDataResponse = await fetchData('/api/engagement-data');
                setEngagementData(Array.isArray(engagementDataResponse) ? engagementDataResponse : []);

                const rawBranchGrowthData = await fetchData('/api/branch-growth');
                const formattedBranchGrowthData = formatBranchGrowthData(rawBranchGrowthData);
                setBranchGrowthData(Array.isArray(formattedBranchGrowthData) ? formattedBranchGrowthData : []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromBackend();
    }, []);

    const engagementFunnelData = {
        labels: ['First Timers', 'Attended Membership Class', 'Joined Department', 'Joined Cell'],
        datasets: [
            {
                label: 'Engagement Funnel',
                data: engagementData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const attendanceLineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Historical Attendance',
                data: [100, 200, 300, 250, 400, 600, 800],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Predicted Attendance',
                data: predictedAttendance,
                borderColor: 'rgba(255,99,132,1)',
                borderDash: [5, 5],
                fill: false,
            },
        ],
    };

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

    const branchGrowthChartData = branchGrowthData.length > 0 ? {
        labels: branchGrowthData.map(branch => branch.name),
        datasets: [{
            label: 'Growth Data',
            data: branchGrowthData.map(branch => branch.value),
            backgroundColor: '#36A2EB',
        }],
    } : {
        labels: ['No data'],
        datasets: [{
            label: 'Growth Data',
            data: [0],
            backgroundColor: '#36A2EB',
        }],
    };

    return (
        <div className="dashboard">
            <h2>GloryPlus International Dashboard</h2>

            <div className="widgets">
                <div className="widget">Total Branches: 7</div>
                <div className="widget">First Timers: 50</div>
                <div className="widget">Second Timers: 30</div>
                <div className="widget">Total Cells: 10</div>
                <div className="widget">Total Members: 1000</div>
                <div className="widget">Total Attendance: 800</div>
            </div>

            <div className="map-container">
                <h3>Branch Locations</h3>
                <MapContainer center={[6.5244, 3.3792]} zoom={7} style={{ height: '300px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {locations.map((location, index) => {
                        const { lat, lng, name } = location;
                        if (lat != null && lng != null) {
                            return (
                                <Marker key={index} position={[lat, lng]}>
                                    <Popup>{name}</Popup>
                                </Marker>
                            );
                        } else {
                            console.warn('Invalid location data:', location);
                            return null;
                        }
                    })}
                </MapContainer>
            </div>

            <div className="chart-wrapper">
                <div className="chart-container">
                    <h3>Attendance Trends</h3>
                    <Line data={attendanceLineData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>

                <div className="chart-container">
                    <h3>Sentiment Analysis Over Time</h3>
                    <Line data={sentimentLineData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>

                <div className="chart-container">
                    <h3>Engagement Conversion Funnel</h3>
                    <Pie data={engagementFunnelData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>

                <div className="chart-container">
                    <h3>Branch Growth and Attendance</h3>
                    <Bar data={branchGrowthChartData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

