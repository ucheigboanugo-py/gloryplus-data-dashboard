// src/chartSetup.js

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,  // Add this line for point elements
  LineElement,   // Add this line if using line charts
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
  PointElement,  // Register point element
  LineElement,   // Register line element if using line charts
  Title,
  Tooltip,
  Legend
);

