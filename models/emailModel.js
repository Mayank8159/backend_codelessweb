const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
}, { timestamps: { type: Date, default: Date.now } });

module.exports = mongoose.model('Email', emailSchema);