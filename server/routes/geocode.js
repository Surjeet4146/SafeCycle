const express = require('express');
const router = express.Router();
const axios = require('axios');
const Geocode = require('../models/Geocode');

router.get('/', async (req, res) => {
  const { address } = req.query;
  try {
    // Check cache
    const cached = await Geocode.findOne({ address });
    if (cached) {
      return res.json({ location: cached.location });
    }

    // Geocode using Google Maps API
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      // Cache result
      await Geocode.create({ address, location });
      res.json({ location });
    } else {
      res.status(400).json({ message: 'Geocoding failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;