const mongoose = require('mongoose');

const TempLogSchema = mongoose.Schema({
  fridgeId: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  logTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('TempLog', TempLogSchema);
