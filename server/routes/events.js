const express = require('express');
const router = express.Router();
const db = require('../db');  // Importing the database connection

// CREATE a new event
router.post('/', (req, res) => {
  const { name, date, location, description } = req.body;
  const sql = 'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [name, date, location, description], (err, result) => {
    if (err) {
      console.error('Error adding event:', err);
      res.status(500).json({ error: 'Error adding event' });
    } else {
      res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
    }
  });
});

// READ all events
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM events';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Error fetching events' });
    } else {
      res.status(200).json(results);
    }
  });
});

// READ a single event by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM events WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching event:', err);
      res.status(500).json({ error: 'Error fetching event' });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    }
  });
});

// UPDATE an event by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  const sql = 'UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?';
  
  db.query(sql, [name, date, location, description, id], (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      res.status(500).json({ error: 'Error updating event' });
    } else {
      res.status(200).json({ message: 'Event updated successfully' });
    }
  });
});

// DELETE an event by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM events WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      res.status(500).json({ error: 'Error deleting event' });
    } else {
      res.status(200).json({ message: 'Event deleted successfully' });
    }
  });
});

module.exports = router;
