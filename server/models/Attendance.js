const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    date: Date,
    branch: String,
    count: Number,
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
