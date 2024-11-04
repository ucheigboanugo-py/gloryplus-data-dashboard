const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all members
router.get('/', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a member by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Add a new member
router.post('/', (req, res) => {
  const newMember = req.body;
  db.query('INSERT INTO members SET ?', newMember, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...newMember });
  });
});

// Update a member
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  db.query('UPDATE members SET ? WHERE id = ?', [updatedMember, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Member updated successfully' });
  });
});

// Delete a member
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM members WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Member deleted successfully' });
  });
});

module.exports = router;
