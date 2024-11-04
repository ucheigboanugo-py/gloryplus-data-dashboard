import React, { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Define data and configuration directly
    const chartData = {
      labels: ['Label1', 'Label2', 'Label3'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };

    

    const config = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: { type: 'category' },
          y: { beginAtZero: true },
        },
      },
    };

    console.log("Chart Data:", chartData);

    // Initialize Chart
    const chartInstance = new ChartJS(ctx, config);

    return () => {
      // Cleanup chart instance on unmount
      chartInstance.destroy();
    };
  }, []); // Empty dependency array to ensure this runs once

  return <canvas ref={chartRef}></canvas>;
};

export default MyChartComponent;

