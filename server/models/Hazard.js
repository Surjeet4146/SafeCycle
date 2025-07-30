const mongoose = require('mongoose');

const hazardSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hazard', hazardSchema);