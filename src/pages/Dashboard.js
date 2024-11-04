import React from 'react';
import { Line, Pie } from 'react-chartjs-2';

const Dashboard = () => {
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Attendance Trends',
                data: [100, 200, 300, 250, 400],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    const pieData = {
        labels: ['Ikeja', 'Island', 'Ketu', 'Port Harcourt', 'Umuahia'],
        datasets: [
            {
                data: [300, 150, 100, 200, 120],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Church Management Dashboard</h2>
            <div className="charts">
                <div className="chart">
                    <Line data={lineData} />
                </div>
                <div className="chart">
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
