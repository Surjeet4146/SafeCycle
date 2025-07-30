const express = require('express');
const router = express.Router();
const Hazard = require('../models/Hazard');

router.post('/', async (req, res) => {
  try {
    const { description, location } = req.body;
    if (!description || !location) {
      return res.status(400).json({ message: 'Description and location are required' });
    }
    const hazard = new Hazard({ description, location });
    await hazard.save();
    res.status(201).json({ message: 'Hazard reported successfully' });
  } catch (error) {
    console.error('Hazard save error:', error);
    res.status(500).json({ message: 'Error reporting hazard' });
  }
});

module.exports = router;