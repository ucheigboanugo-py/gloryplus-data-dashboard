const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Define PORT and use environment variable if available

app.use(cors());
app.use(express.json());

// Import routes
const memberRoutes = require('./routes/members');
const attendanceRoutes = require('./routes/attendance');
const eventRoutes = require('./routes/events');

// Use routes
app.use('/members', memberRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/events', eventRoutes);

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Farmgate',
  database: 'gloryplus_database'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Test endpoint
app.get('/', (req, res) => {
  res.send("Welcome to the GloryPlus Church Management System!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

