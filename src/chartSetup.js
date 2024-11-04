// src/chartSetup.js

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, // required for pie/doughnut charts
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register the necessary chart elements and plugins globally
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  