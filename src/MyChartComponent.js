import React, { useRef, useEffect } from 'react';
import './chartSetup'; // Imports and registers everything from chartSetup.js
import { Chart as ChartJS } from 'chart.js';

const MyChartComponent = () => {
  const chartRef = useRef(null); // Ref for canvas element
  const chartInstance = useRef(null); // Ref for chart instance

  useEffect(() => {
    // Destroy any existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new ChartJS(ctx, {
      type: 'bar', // 'bar', 'pie', 'line', etc.
      data: {
        labels: ['Label1', 'Label2', 'Label3'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
      options: {
        scales: {
          x: { type: 'category' },
          y: { beginAtZero: true },
        },
      },
    });

    // Cleanup: Destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return <canvas ref={chartRef}></canvas>;
};

export default MyChartComponent;
