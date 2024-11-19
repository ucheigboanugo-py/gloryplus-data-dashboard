import React from 'react';
import { useParams } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import Map from '../components/Map'; // Adjust the path if necessary

const BranchDashboard = () => {
    const { branchName } = useParams();

    // Sample data for each branch - replace with actual data as needed
    const branchData = {
        mainlandhq: {
            pastor: "Pastor John Doe",
            address: "123 Mainland St.",
            coordinates: { lat: 6.5244, lng: 3.3792 },
            firstTimers: 30,
            secondTimers: 20,
            members: 500,
            attendees: 450,
            monthlyAttendance: [400, 420, 450, 470, 500, 480, 510, 530, 550, 560, 580, 600], // Example attendance data
        },
        // Add similar data objects for other branches
    };

    const data = branchData[branchName.toLowerCase().replace(" ", "")];

    // Check if branch data is available
    if (!data) {
        return <div>Branch data not found</div>;
    }

    // Pie chart data for different categories
    const pieData = {
        labels: ['First Timers', 'Second Timers', 'Members', 'Attendees'],
        datasets: [
            {
                data: [data.firstTimers, data.secondTimers, data.members, data.attendees],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    // Line chart data for monthly attendance trend
    const lineData = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Monthly Attendance",
                data: data.monthlyAttendance,
                borderColor: "#4BC0C0",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="branch-dashboard">
            <h2>{branchName} Dashboard</h2>
            <p><strong>Pastor:</strong> {data.pastor}</p>
            <p><strong>Address:</strong> {data.address}</p>

            {/* Map component for branch location */}
            <div className="map">
                <Map coordinates={data.coordinates} />
            </div>

            <div className="widgets">
                <div>First Timers: {data.firstTimers}</div>
                <div>Second Timers: {data.secondTimers}</div>
                <div>Members: {data.members}</div>
                <div>Attendees: {data.attendees}</div>
            </div>

            {/* Pie chart for member distribution */}
            <div className="chart">
                <Pie data={pieData} />
            </div>

            {/* Line chart for monthly attendance */}
            <div className="chart">
                <h3>Monthly Attendance</h3>
                <Line data={lineData} />
            </div>
        </div>
    );
};

export default BranchDashboard;

