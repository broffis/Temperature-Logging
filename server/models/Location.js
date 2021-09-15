const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
});

module.exports = mongoose.model('Location', LocationSchema);
