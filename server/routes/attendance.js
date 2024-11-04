const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
    const attendanceData = await Attendance.find();
    res.json(attendanceData);
});

module.exports = router;
