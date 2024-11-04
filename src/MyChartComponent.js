import React from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const MyChartComponent = () => {
    const lineData = {
        labels: ['Mainland HQ', 'Island HQ', 'Majek', 'Ketu', 'Aba', 'Umuahia', 'Portharcourt'],
        datasets: [
            {
                label: 'Attendance',
                data: [75, 60, 45, 50, 30, 25, 40],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Mainland HQ', 'Island HQ', 'Majek', 'Ketu', 'Aba', 'Umuahia', 'Portharcourt'],
        datasets: [
            {
                label: 'Attendance',
                data: [75, 60, 45, 50, 30, 25, 40],
                backgroundColor: [
                    'rgba(75,192,192,0.2)',
                    'rgba(153,102,255,0.2)',
                    'rgba(255,159,64,0.2)',
                    'rgba(255,205,86,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(201,203,207,0.2)',
                    'rgba(255,99,132,0.2)',
                ],
                borderColor: [
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)',
                    'rgba(255,205,86,1)',
                    'rgba(54,162,235,1)',
                    'rgba(201,203,207,1)',
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333',
                    font: { size: 14, family: 'Arial', weight: 'bold' },
                },
            },
            tooltip: {
                backgroundColor: '#000',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
            },
        },
        scales: {
            x: { ticks: { color: '#333', font: { size: 12 } } },
            y: { beginAtZero: true, ticks: { color: '#333', font: { size: 12 } } },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <div style={{ marginBottom: '40px' }}>
                <Line key="line-chart" data={lineData} options={options} />
            </div>
            <div>
                <Pie key="pie-chart" data={pieData} options={options} />
            </div>
        </div>
    );
};

export default MyChartComponent;
