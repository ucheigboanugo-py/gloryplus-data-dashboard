const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name: String,
    date: Date,
    branch: String,
    followUpStatus: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
