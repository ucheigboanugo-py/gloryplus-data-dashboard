import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import branchLocations from '../branches.js';
import { fetchData, formatBranchGrowthData } from '../api/dataService';
import '../components/FileUpload/FileUpload.css';
import Sidebar from '../components/Sidebar';
import Map, { Marker, Popup } from 'react-map-gl'; // Mapbox components
import 'mapbox-gl/dist/mapbox-gl.css';

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

    const branches = [
        { name: "Mainland HQ", coordinates: [3.3792, 6.5244] },
        { name: "Island HQ", coordinates: [3.4006, 6.4483] },
        // Additional branch locations can be added here
    ];

    const isValidCoordinate = (coords) => {
        return (
            coords &&
            Array.isArray(coords) &&
            coords.length === 2 &&
            !isNaN(coords[0]) &&
            !isNaN(coords[1])
        );
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">GloryPlus International Dashboard</h2>

            <Sidebar />

            <div className="row text-center mb-4">
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>Total Branches: 7</div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>First Timers: 50</div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>Second Timers: 30</div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>Total Cells: 10</div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>Total Members: 1000</div>
                    </div>
                </div>
                <div className="col-md-2 col-6 mb-2">
                    <div className="card shadow-sm" style={{ height: '80px' }}>
                        <div className="card-body" style={{ fontSize: '0.85rem' }}>Total Attendance: 800</div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <h3>Attendance Trends</h3>
                    <Line data={attendanceLineData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
                <div className="col-md-6">
                    <h3>Sentiment Analysis Over Time</h3>
                    <Line data={sentimentLineData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h3>Engagement Conversion Funnel</h3>
                    <Pie data={engagementFunnelData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
                <div className="col-md-6 mb-4">
                    <h3>Branch Growth and Attendance</h3>
                    <Bar data={branchGrowthChartData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
            </div>

            {/* Map Section */}
            <div className="row mb-4">
                <div className="col-md-12">
                    <h3>Branch Locations</h3>
                    <Map
                        initialViewState={{
                            longitude: 3.3792,
                            latitude: 6.5244,
                            zoom: 10
                        }}
                        style={{ width: "100%", height: "400px" }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken="mapboxgl.accessToken = 'pk.eyJ1IjoidWNoZWxvdWlzNDUiLCJhIjoiY20zMHhoMjU4MG52czJtc2dyZzk1ZTF1cCJ9.mEGv1tIskRGRlIpqb0MO-A';" // Replace with your Mapbox token
                    >
                        {branches.map((branch, index) => (
                            isValidCoordinate(branch.coordinates) ? (
                                <Marker
                                    key={index}
                                    longitude={branch.coordinates[0]}
                                    latitude={branch.coordinates[1]}
                                    anchor="bottom"
                                >
                                    <Popup offset={25}>{branch.name}</Popup>
                                </Marker>
                            ) : (
                                console.warn(`Invalid coordinates for branch: ${branch.name}`)
                            )
                        ))}
                    </Map>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="row">
                <div className="col-md-12">
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li>Monthly Cell Leaders' Meeting</li>
                        <li>Workers' Conference</li>
                        <li>Branch Outreach Program</li>
                        {/* Add more events as needed */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


