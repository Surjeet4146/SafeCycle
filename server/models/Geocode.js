const mongoose = require('mongoose');

const geocodeSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now, expires: '30d' },
});

module.exports = mongoose.model('Geocode', geocodeSchema);